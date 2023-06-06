import { EViberEventType } from "./enums/viber-event-type.enum";
import { IViberActionArg } from "./interfaces/viber-action-arg.interface";
import { IViberConversationStartedMessage } from "./interfaces/viber-conversation-started-message.interface";
import { IViberMessage } from "./interfaces/viber-message.interface";
import { IViberResponse } from "./interfaces/viber-response.interface";
import { IViberUnsubscribeMessage } from "./interfaces/viber-unsubscribe.interface";
import { renderToStringAsync } from "./utils/render-to-string-async.util";
import { LINK_AND_METADATA_SEPARATOR } from "./viber-components/viber-button.component";

export  const createExpressCallback = (reactApp:any) => async (request:any, response:any) => {
	try {
		const requestBody = request.body;
		console.log('webhook_request body = ', requestBody);

		let resObj: IViberResponse | undefined = undefined;
		if (requestBody.event === EViberEventType.message) {
			const body = requestBody as IViberMessage;
			let actionArg: IViberActionArg | undefined = { link: '' };
			const input = body.message.tracking_data || body.message.text?.split(LINK_AND_METADATA_SEPARATOR).pop() || '';
			try {
				actionArg = JSON.parse(input) as IViberActionArg;
			} catch (ex) {
				console.error('error parse input argument input = ',input)
				actionArg = { link: '' };
			}
			const result = await renderToStringAsync(reactApp, {
				body,
				actionArg,
				tracking_data: body.message.tracking_data
			});
			resObj = {
				message: result.json,
			};
		} else if (requestBody.event === EViberEventType.conversation_started) {
			const body = requestBody as IViberConversationStartedMessage;
			console.log('subscribe', body);

			const result = await renderToStringAsync(reactApp,{
				conversation_started_body: body,

				actionArg: {
					link: '/',
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
}



