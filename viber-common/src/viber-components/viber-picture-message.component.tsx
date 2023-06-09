import { EViberMessageType } from '@viber-common/enums/viber-message-type.enum';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import React, { ReactNode } from 'react';
import { Json } from './json.component';
import { IViberBaseMessage } from '@viber-common/interfaces/viber-base-message.interface';

interface IProps extends IViberBaseMessage {
    text: string;
	receiver: IViberReceiver ;
	keyboard?: ReactNode;
	tracking_data?: string;
	media: string;
	thumbnail?: string;
}

export const ViberPictureMessage = ({
    receiver,
	keyboard,
	media,
	thumbnail,
	...rest
}: IProps): JSX.Element => {
	return <Json
		json={{
			receiver: receiver?.id,
			text: (rest).text || '',
			min_api_version: 7,
			// tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
			type: EViberMessageType.picture,
			media,
			thumbnail
		}}
	>
		{keyboard ? <>, "keyboard":{keyboard}</> : null}
	</Json>;
	
};
