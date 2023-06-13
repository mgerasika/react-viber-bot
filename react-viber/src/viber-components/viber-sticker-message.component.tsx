import { EViberMessageType } from '@react-viber/enums/viber-message-type.enum';
import React from 'react';
import { Json } from './json.component';
import { IViberBaseMessage } from '@react-viber/interfaces/viber-base-message.interface';

interface IProps extends IViberBaseMessage  {
    sticker_id: number;
}
// sticker ids -> https://developers.viber.com/docs/tools/sticker-ids/
export const ViberStickerMessage = ({
    receiver,
	keyboard,
	...rest
}: IProps): JSX.Element => {
	return <Json
		json={{
			...rest,
			receiver: receiver.id,
			min_api_version: 7,
			// tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
			type: EViberMessageType.sticker,
		}}
	>
		{keyboard ? <>, "keyboard":{keyboard}</> : null}
	</Json>;
	
};
