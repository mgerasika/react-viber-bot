import express from "express";
const http = require("http");
const app = express();


import bodyParser from "body-parser";
import "module-alias/register";
const moduleAlias = require('module-alias');

//
// Register alias
//
moduleAlias.addAlias('@src', __dirname + '../../dist');

import { VIBER_LINKS } from "./constants/viber-links.constant";
import { EViberEventType } from "./enums/viber-event-type.enum";
import { IViberActionArg } from "./interfaces/viber-action-arg.interface";
import { IViberConversationStartedMessage } from "./interfaces/viber-conversation-started-message.interface";
import { IViberMessage } from "./interfaces/viber-message.interface";
import { IViberResponse } from "./interfaces/viber-response.interface";
import { IViberUnsubscribeMessage } from "./interfaces/viber-unsubscribe.interface";
import { renderToStringAsync } from "./viber-components/render-to-string-async";


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

app.post("/web_hook", async (request, response) => {
	try {
		const requestBody = request.body;
		console.log('webhook_request body = ', requestBody);

		let resObj: IViberResponse | undefined = undefined;
		if (requestBody.event === EViberEventType.message) {
			const body = requestBody as IViberMessage;
			let actionArg: IViberActionArg | undefined = { link: '' };
			try {
				actionArg = JSON.parse(body.message.tracking_data || body.message.text) as IViberActionArg;
			} catch  {
				actionArg = { link: '' };
			}
			const result = await renderToStringAsync({
				body,
				actionArg,
			});
			resObj = {
				message: result.json,
			};
		} else if (requestBody.event === EViberEventType.conversation_started) {
			const body = requestBody as IViberConversationStartedMessage;
			console.log('subscribe', body);

			const result = await renderToStringAsync({
				conversation_started_body: body,

				actionArg: {
					link: VIBER_LINKS.welcome.toString(),
				},
			});
			resObj = {
				message: result.json,
			};
		} else if (requestBody.event === EViberEventType.subscribed) {
			resObj = {
				message: 'subscribed',
			};
		} else if (requestBody.event === EViberEventType.unsubscribed) {
			const body = requestBody as IViberUnsubscribeMessage;
			console.log('unsubscribe', body);

			resObj = {
				message: 'unsubscribed',
			};
		}
		console.log('webhook_response = ', resObj);
		if (resObj && resObj.message) {
			return response.status(200).send(JSON.stringify(resObj));
		}
		else {
			return response.status(200).send();
		}
	} catch (err) {
		console.log('error', err);
		response.status(400).send();
	}
});

const PORT = process.env.PORT || 3009;
console.log('env', app.get("env"));

const httpServer = http.createServer(app);

httpServer.listen(PORT, () => {
  console.log(`Example http app listening on port ${PORT}`);
});


