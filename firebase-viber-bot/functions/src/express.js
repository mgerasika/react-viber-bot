const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const functions = require("firebase-functions");
require("module-alias/register");
require("dotenv").config();

const EApis = {
	setup: "/setup",
	unSetup: "/unsetup",
	webhook: "/webhook",
};
const ENV = {
	VIBER_WEB_HOOK: process.env.VIBER_WEB_HOOK,
	PROXY_WEB_HOOK: process.env.PROXY_WEB_HOOK,
	VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
};
const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true,
	})
);
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());
app.get(EApis.webhook, (req, res) => {
	functions.logger.log('get apis ' + Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + " proxyHook=" + ENV.VIBER_WEB_HOOK);
	res.send(Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + ' proxyHook=' + ENV.PROXY_WEB_HOOK);
});

app.get('/echo', (req, res) => {
	functions.logger.log('echo ' + Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + " proxyHook=" + ENV.VIBER_WEB_HOOK);
	res.send(Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK + ' proxyHook=' + ENV.PROXY_WEB_HOOK);
});


app.post(EApis.webhook, async (req, res) => {
	const body = req.body;

	functions.logger.log("webhook-body", JSON.stringify(body));
	try {
		await axios
			.post(ENV.PROXY_WEB_HOOK, body)
			.then(async (x) => {
				functions.logger.log("webhook-result success");
				functions.logger.log("webhook-result then = ", x.data ? JSON.stringify(x.data) : 'empty');
				const data = x.data;
				if (data.message) {
					await sendMessageAsync(data.message);
				}
				else {
				}
				return true;
			})
			.catch((error) => {
				functions.logger.log("webhook-result error inside = ", JSON.stringify(error));
			});

	} catch (error) {
		functions.logger.log("error outside = " + JSON.stringify(error));
	}

	res.status(200).send();
});

app.get(EApis.setup, async (req, res) => {
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

app.get(EApis.unSetup, async (req, res) => {
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
module.exports = app;
// const PORT = process.env.PORT || 3005;
// console.log(app.get("env"));
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

function getAxiosConfig() {
	return {
		headers: {
			"X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN,
		},
	};
}

//  sender: {
// 	name: "John McClane",
// 	avatar: "http://avatar.example.com",
//   },
async function sendMessageAsync(message) {
	try {
		const data = await axios.post('https://chatapi.viber.com/pa/send_message', message, getAxiosConfig());
		return { data };
	} catch (error) {
		console.log('error ', JSON.stringify(error));
		return { error };
	}
}

async function broadcastMessageAsync(message) {
	try {
		const data = await axios.post('https://chatapi.viber.com/pa/broadcast_message', message, getAxiosConfig());
		return { data };
	} catch (error) {
		console.log('error ', JSON.stringify(error));
		return { error };
	}
}