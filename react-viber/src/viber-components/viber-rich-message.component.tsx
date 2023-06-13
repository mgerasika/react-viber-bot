import { EViberMessageType } from '@react-viber/enums/viber-message-type.enum';
import React, { ReactNode } from 'react';
import { Json } from './json.component';
import { IViberBaseMessage } from '@react-viber/interfaces/viber-base-message.interface';


interface IProps  extends IViberBaseMessage{
    rich_media: ReactNode;
}

export const ViberRichMessage = ({
    receiver,
	keyboard,
	...rest
}: IProps): JSX.Element => {
	return (
		<Json
			json={{
				receiver: receiver?.id,
				min_api_version: 7,
				// tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
				type: EViberMessageType.rich_media,
			}}
		>
			{keyboard ? <>,"keyboard":{keyboard}</> : null}
			{(rest).rich_media ? <>, "rich_media":{(rest).rich_media}</> : null}
		</Json>
	);
};
