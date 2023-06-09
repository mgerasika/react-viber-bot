import { EViberMessageType } from '@viber-common/enums/viber-message-type.enum';
import React from 'react';
import { Json } from './json.component';
import { IViberBaseMessage } from '@viber-common/interfaces/viber-base-message.interface';

interface IProps extends IViberBaseMessage  {
	media: string;
	sizeInBytes: number;
	file_name: string;
}

export const ViberFileMessage = ({
    receiver,
	keyboard,
sizeInBytes,
	...rest
}: IProps): JSX.Element => {
	return <Json
		json={{
			receiver: receiver?.id,
			min_api_version: 7,
			// tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
			type: EViberMessageType.file,
			size: sizeInBytes,
			...rest
		}}
	>
		{keyboard ? <>, "keyboard":{keyboard}</> : null}
	</Json>;
	
};
