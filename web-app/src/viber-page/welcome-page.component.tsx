import { LINKS } from '@src/constants/links.constant';
import { IViberConversationStartedRequest } from '@src/interfaces/viber-request.interface';
import { IViberReceiver } from '@src/interfaces/viber-sender.interface';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
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
