
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import React from 'react';

export const ExitPage = (): JSX.Element => {
	const { body_request } = useViberRequest();
	if (!body_request) {
		return <></>;
	}
    return <ViberMessage receiver={body_request.sender as IViberReceiver} text={'Exit'} />;
};
