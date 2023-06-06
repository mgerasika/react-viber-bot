import { LINKS } from '@src/constants/links.constant';
import { IViberConversationStartedRequest } from '@viber-common/interfaces/viber-request.interface';
import { IViberReceiver } from '@viber-common/interfaces/viber-sender.interface';
import { ViberButton } from '@viber-common/viber-components/viber-button.component';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';

import React from 'react';

interface IProps {
    request: IViberConversationStartedRequest;
}

export const WelcomePage = ({ request: { conversation_started_body } }: IProps): JSX.Element => {
    return (
        <ViberMessage
            receiver={conversation_started_body?.user as IViberReceiver}
            text={'Hello react viber storybook'}
            keyboard={
				<ViberKeyboard buttons={
					<>
						<ViberButton actionType='reply' Columns={3} Rows={1} Text="Explore" actionBody={{ link: LINKS.index }} />
					</>
				}
				/>
                   
            }
        />
    );
};
