/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
export const expressApp = express();
const functions = require("firebase-functions");
require("module-alias/register");
require("dotenv").config();
import axios, { AxiosRequestConfig } from 'axios';
import bodyParser from "body-parser";
const moduleAlias = require('module-alias');
const path = require('path');
//
// Register alias
//
moduleAlias.addAlias('@viber-common', path.resolve(__dirname, '../..') + '/viber-common/src');
moduleAlias.addAlias('@src', path.resolve(__dirname, '../..') + '../../dist/web-app/src');

import { createExpressCallback } from '../../viber-common/src/express-callback';
import { App } from "./viber-page/app.component";
import { ENV } from "./env.constant";

expressApp.use(bodyParser.json()); // to support JSON-encoded bodies
expressApp.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
expressApp.use(express.json());
expressApp.use(express.urlencoded());
// app.use(express.multipart());


const EApis = {
	setup: "/setup",
	unSetup: "/unsetup",
	webhook: "/react_viber_web_hook",
	proxy_web_hook: "/proxy_web_hook"
};

expressApp.get('/', (req:any, res:any) => {
	functions.logger.log('echo ' + Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + " proxyHook=" + ENV.PROXY_WEB_HOOK);
	res.send(Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + ' proxyHook=' + ENV.PROXY_WEB_HOOK);
});

const expressCallback = createExpressCallback(<App />);
const DEBUG = true;
if (DEBUG) {
	expressApp.post(EApis.proxy_web_hook, expressCallback);

	expressApp.post(EApis.webhook, async (req: any, res: any) => {
		const body = req.body;

		functions.logger.log("webhook-body", JSON.stringify(body));
		try {
			await axios
				.post(ENV.PROXY_WEB_HOOK || '', body)
				.then(async (x: any) => {
					functions.logger.log("webhook-result success");
					functions.logger.log("webhook-result then = ", x.data ? JSON.stringify(x.data) : 'empty');
					const data = x.data;
					if (data) {
						await sendMessageAsync(data);
					}
				
					return true;
				})
				.catch((error: any) => {
					functions.logger.log("webhook-result error inside = ", JSON.stringify(error));
				});

		} catch (error) {
			functions.logger.log("error outside = " + JSON.stringify(error));
		}

		res.status(200).send();
	});
}
else {
	expressApp.post(EApis.webhook, expressCallback);
}

expressApp.get(EApis.setup, async (req:any, res:any) => {
	try {
		const data = await axios.post(
			"https://chatapi.viber.com/pa/set_webhook",
			{
				url: `${ ENV.VIBER_WEB_HOOK }`,
				event_types: [
					//   "delivered",
					//   "seen",
					"failed",
					"subscribed",
					"unsubscribed",
					"message",
					"conversation_started",
				],
				send_name: true,
				send_photo: true,
			},
			getAxiosConfig()
		);
		console.log(data.data);
		res.status(200).send(data.data);
	} catch (error) {
		console.log("error = ", error);
		res.status(400).send(error);
	}
});

expressApp.get(EApis.unSetup, async (req:any, res:any) => {
	try {
		const data = await axios.post(
			"https://chatapi.viber.com/pa/set_webhook",
			{
				url: "",
			},
			getAxiosConfig()
		);
		console.log(data.data);
		res.status(200).send(data.data);
	} catch (error) {
		console.log("error = ", error);
		res.status(400).send(error);
	}
});

function getAxiosConfig():AxiosRequestConfig {
	return {
		headers: {
			"X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN || '',
		},
	};
}

//  sender: {
// 	name: "John McClane",
// 	avatar: "http://avatar.example.com",
//   },
async function sendMessageAsync(message: any) {
	try {
		const data = await axios.post('https://chatapi.viber.com/pa/send_message', message, getAxiosConfig());
		return { data };
	} catch (error) {
		console.log('error ', JSON.stringify(error));
		return { error };
	}
}

async function broadcastMessageAsync(message: any) {
	try {
		const data = await axios.post('https://chatapi.viber.com/pa/broadcast_message', message, getAxiosConfig());
		return { data };
	} catch (error) {
		console.log('error ', JSON.stringify(error));
		return { error };
	}
}




