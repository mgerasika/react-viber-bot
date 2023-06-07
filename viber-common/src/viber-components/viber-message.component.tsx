import { EViberMessageType } from '@viber-common/enums/viber-message-type.enum';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import React, { ReactNode } from 'react';
import { Json } from './json.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { getViberActionId } from '@viber-common/utils/get-viber-action-id.util';

interface IBaseProps {
	receiver: IViberReceiver ;
	keyboard?: ReactNode;
	tracking_data?: string;
}
interface ITextProps extends IBaseProps {
    text: string | undefined;
}

interface IRichProps extends IBaseProps {
    rich_media: ReactNode;
}

type IProps = IRichProps | ITextProps;
export const ViberMessage = ({
    receiver,
	keyboard,
	...rest
}: IProps): JSX.Element => {
	const request = useViberRequest();
	if ((rest as ITextProps).text ) {
		return (
			<Json
				json={{
					receiver: receiver?.id,
					text: (rest as ITextProps).text || '',
					min_api_version: 7,
					tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
					type: EViberMessageType.text,
				}}
			>
				{keyboard ? <>, "keyboard":{keyboard}</> : null}
			</Json>
		);
	}
	if ((rest as IRichProps).rich_media) {
		return  (
			<Json
				json={{
					receiver: receiver?.id,
					min_api_version: 7,
					tracking_data: request.actionArg.link ? getViberActionId({link:request.actionArg.link}) : undefined,
					type: EViberMessageType.rich_media,
				}}
			>
				{keyboard ? <>,"keyboard":{keyboard}</> : null}
				{(rest as IRichProps).rich_media ? <>, "rich_media":{(rest as IRichProps).rich_media}</> : null}
			</Json>
		);
	}
	return <></>
};
