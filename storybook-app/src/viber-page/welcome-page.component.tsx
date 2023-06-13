import { Button } from '@react-viber/general-ui/button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';
import React from 'react';

export const WelcomePage = (): JSX.Element => {
	const { conversation_started_request } = useViberRequest();
	if (!conversation_started_request) {
		return <></>;
	}
    return (
        <ViberTextMessage
            receiver={conversation_started_request.user }
            text={'Hi, this is simple viber bot written in react library. Explore react components bellow'}
            keyboard={
				<ViberKeyboard Buttons={
					<>
						<Button name='explore' ActionType='reply' Columns={6} Rows={1} Text="Explore"  />
					</>
				}
				/>
                   
            }
        />
    );
};
