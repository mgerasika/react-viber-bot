import { LINKS } from '@src/constants/links.constant';
import { IViberBodyRequest } from '@viber-common/interfaces/viber-request.interface';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import { ViberButton } from '@viber-common/viber-components/viber-button.component';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';

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
