/* eslint-disable @typescript-eslint/no-var-requires */
import express from "express";
export const expressApp = express();
require("module-alias/register");
require("dotenv").config();
import axios, { AxiosRequestConfig } from 'axios';
import bodyParser from "body-parser";
const moduleAlias = require('module-alias');
const path = require('path');
//
// Register alias
//
moduleAlias.addAlias('@react-viber', path.resolve(__dirname, '../..') + '/react-viber/src');
moduleAlias.addAlias('@src', path.resolve(__dirname, '../..') + '../../dist/web-app/src');

import { createExpressCallback } from '../../react-viber/src/express-callback';
import { App } from "./viber-page/app.component";
import { ENV } from "./env.constant";
import { API_URLS } from "./constants/api-urls.constant";

expressApp.use(bodyParser.json()); // to support JSON-encoded bodies
expressApp.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
expressApp.use(express.json());
expressApp.use(express.urlencoded());


expressApp.get('/', (req:any, res:any) => {
	res.send(Object.values(API_URLS).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + ' proxyHook=' + ENV.PROXY_WEB_HOOK);
});

const expressCallback = createExpressCallback(<App />);
const PROXY_SERVER = true;
if (PROXY_SERVER) {
	expressApp.post(API_URLS.proxy_web_hook, expressCallback);

	expressApp.post(API_URLS.webhook, async (req: any, res: any) => {
		const body = req.body;

		try {
			await axios
				.post(ENV.PROXY_WEB_HOOK || '', body)
				.then(async (response: any) => {
					const data = response.data;
					if (data) {
						await sendMessageAsync(data);
					}
				})
				.catch((ex) => {
					console.error(ex);
				});

		} catch (ex) {
			console.error(ex);
		}

		res.status(200).send();
	});
}
else {
	expressApp.post(API_URLS.webhook, expressCallback);
}

expressApp.get(API_URLS.setup, async (req:any, res:any) => {
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

expressApp.get(API_URLS.unSetup, async (req:any, res:any) => {
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

// example
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




