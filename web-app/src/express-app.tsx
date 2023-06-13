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

import { renderToStringAsync } from '../../react-viber/src/render-to-string-async';
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

const PROXY_SERVER = false;
if (PROXY_SERVER) {
	expressApp.post(API_URLS.proxy_web_hook, async (req, res) => {
		const data = await renderToStringAsync(<App />, req);
		return res.status(data.status).send(JSON.stringify(data.message));
	});

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
					return true;
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
	expressApp.post(API_URLS.webhook, async (req: any, res: any) => {
		const data = await renderToStringAsync(<App />, req);

		try {
			if (data && data.status < 400) {
				await sendMessageAsync(data.message);
			}

		} catch (ex) {
			console.error(ex);
		}

		res.status(200).send();
	});
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




