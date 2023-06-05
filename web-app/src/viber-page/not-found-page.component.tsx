import { LINKS } from '@src/constants/links.constant';
import { IViberBodyRequest } from '@src/interfaces/viber-request.interface';
import { IViberReceiver } from '@src/interfaces/viber-sender.interface';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberBodyRequest;
}

export const NotFoundPage = ({ request: { body } }: IProps): JSX.Element => {
    return (
        <ViberMessage
            receiver={body?.sender as IViberReceiver}
            text={'Page not found'}
            keyboard={
				<ViberKeyboard buttons={
					<>
						<ViberButton actionType='reply' Columns={3} Rows={1} Text="Main" actionBody={{ link: LINKS.index }} />
						<ViberButton actionType='reply' Columns={3} Rows={1} Text="Exit" actionBody={{ link: LINKS.exit }} />
					</>
				}
				/>
                   
            }
        />
    );
};
