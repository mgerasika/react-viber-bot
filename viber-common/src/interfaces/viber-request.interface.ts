import { IViberActionArg } from './viber-action-arg.interface';
import { IViberConversationStartedMessage } from './viber-conversation-started-message.interface';
import { IViberMessage } from './viber-message.interface';

 export interface IViberBodyRequest {
    body: IViberMessage;
	actionArg: IViberActionArg | undefined;
	tracking_data?: string;
}

 export interface IViberConversationStartedRequest {
    conversation_started_body: IViberConversationStartedMessage;
	actionArg: IViberActionArg | undefined;
	tracking_data?: string;
}

export type IViberRequest = IViberBodyRequest | IViberConversationStartedRequest;
