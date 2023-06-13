import { EViberMessageType } from '@react-viber/enums/viber-message-type.enum';
import React from 'react';
import { Json } from './json.component';
import { IViberBaseMessage } from '@react-viber/interfaces/viber-base-message.interface';

interface IProps extends IViberBaseMessage  {
	contact: {
		name: string;
		phone_number: string;
	}
}

export const ViberContactMessage = ({
    receiver,
	keyboard,
	...rest
}: IProps): JSX.Element => {
	return <Json
		json={{
			receiver: receiver?.id,
			min_api_version: 7,
			// tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
			type: EViberMessageType.contact,
			...rest
		}}
	>
		{keyboard ? <>, "keyboard":{keyboard}</> : null}
	</Json>;
	
};
