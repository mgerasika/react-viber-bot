
import { IViberBodyRequest } from '@viber-common/interfaces/viber-request.interface';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberBodyRequest;
}

export const ExitPage = ({ request: { body } }: IProps): JSX.Element => {
    return <ViberMessage receiver={body?.sender as IViberReceiver} text={'Exit'} />;
};
