import { EViberMessageType } from '@react-viber/enums/viber-message-type.enum';
import React from 'react';
import { Json } from './json.component';
import { IViberBaseMessage } from '@react-viber/interfaces/viber-base-message.interface';

interface IProps extends IViberBaseMessage  {
    text: string;
}

export const ViberTextMessage = ({
    receiver,
	keyboard,
	...rest
}: IProps): JSX.Element => {
	return <Json
		json={{
			receiver: receiver?.id,
			text: (rest).text || '-',
			min_api_version: 7,
			// tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
			type: EViberMessageType.text,
		}}
	>
		{keyboard ? <>, "keyboard":{keyboard}</> : null}
	</Json>;
	
};
