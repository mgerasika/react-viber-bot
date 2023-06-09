
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import { ViberTextMessage } from '@viber-common/viber-components/viber-text-message.component';
import React from 'react';

export const ExitPage = (): JSX.Element => {
	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
    return <ViberTextMessage receiver={message_request.sender as IViberReceiver} text={'Exit'} />;
};
