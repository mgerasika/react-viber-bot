import { ReactNode } from 'react';
import { IViberReceiver } from './viber-sender.interface';

export interface IViberBaseMessage {
	receiver: IViberReceiver ;
	keyboard?: ReactNode;
	tracking_data?: string;
}
