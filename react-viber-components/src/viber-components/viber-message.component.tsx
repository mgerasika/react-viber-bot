import { EViberMessageType } from '@src/enums/viber-message-type.enum';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import React, { ReactNode, useReducer } from 'react';
import { Json } from './json.component';
import { useRequest } from '@src/hooks/use-request.hook';

interface IBaseProps {
	sender: IViberSender | undefined;
    keyboard?: ReactNode;
}
interface ITextProps extends IBaseProps {
    text: string | undefined;
}

interface IRichProps extends IBaseProps {
    rich_media: ReactNode;
}

type IProps = IRichProps | ITextProps;
export const ViberMessage = ({
    sender,
    keyboard,
	...rest
}: IProps): JSX.Element => {
	const {  tracking_data } = useRequest();
	if ((rest as ITextProps).text ) {
		return (
			<Json
				json={{
					receiver: sender?.id,
					text: (rest as ITextProps).text || '',
					min_api_version: 7,
					// tracking_data, // got problem, need investigate more
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
					receiver: sender?.id,
					min_api_version: 7,
					// tracking_data, // got problem, need investigate more
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
