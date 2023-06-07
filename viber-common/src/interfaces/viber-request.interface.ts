import { IViberActionArg } from './viber-action-arg.interface';
import { IViberConversationStartedMessage } from './viber-conversation-started-message.interface';
import { IViberMessage } from './viber-message.interface';


export interface IViberRequest{
	actionArg: IViberActionArg;
	trackingData?: string;
	body_request: IViberMessage | undefined;
	conversation_started_request: IViberConversationStartedMessage | undefined;
}
