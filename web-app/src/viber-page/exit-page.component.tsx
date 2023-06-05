import { IViberBodyRequest } from '@src/interfaces/viber-request.interface';
import { IViberReceiver } from '@src/interfaces/viber-sender.interface';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberBodyRequest;
}

export const ExitPage = ({ request: { body } }: IProps): JSX.Element => {
    return <ViberMessage receiver={body?.sender as IViberReceiver} text={'Exit'} />;
};
