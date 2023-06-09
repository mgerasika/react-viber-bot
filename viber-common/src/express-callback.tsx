import { EViberEventType } from "./enums/viber-event-type.enum";
import { IViberActionArg } from "./interfaces/viber-action-arg.interface";
import { IViberConversationStartedMessage } from "./interfaces/viber-conversation-started-message.interface";
import { IViberMessage } from "./interfaces/viber-message.interface";
import { IViberResponse } from "./interfaces/viber-response.interface";
import { IViberUnsubscribeMessage } from "./interfaces/viber-unsubscribe.interface";
import { renderToStringAsync } from "./utils/render-to-string-async.util";
import { LINK_AND_METADATA_SEPARATOR } from "./general-ui/button.component";
import { isJsonString } from "./utils/is-json-string.utils";


export  const createExpressCallback = (reactApp:any) => async (request:any, response:any) => {
	try {
		const requestBody = request.body;
		console.log('webhook_request body = ', requestBody);

		let resObj: IViberResponse | undefined = undefined;
		if (requestBody.event === EViberEventType.message) {
			const body = requestBody as IViberMessage;
			let actionArg: IViberActionArg = { link: '' };
			const input = isJsonString(body.message.text || '') ? body.message.text?.split(LINK_AND_METADATA_SEPARATOR).pop() || '' : body.message.tracking_data || '';
			
			console.log('try parse input = ' + input);
			try {
				actionArg = JSON.parse(input) as IViberActionArg;
			} catch (ex) {
				console.error('error parse input argument input = ', input);
				actionArg = { link: '' };
			}
			const result = await renderToStringAsync(reactApp, {
				message_request: body ,
				conversation_started_request: undefined,
				actionArg,
				trackingData: undefined,
			});
			resObj = {
				message: result.json,
			};
		} else if (requestBody.event === EViberEventType.conversation_started) {
			const body = requestBody as IViberConversationStartedMessage;
			console.log('subscribe', body);

			const result = await renderToStringAsync(reactApp,{
				conversation_started_request: body,
				message_request: undefined,
				actionArg: {
					link: '/',
				},
				trackingData:undefined,
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



