import { Button } from '@viber-common/general-ui/button.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import React from 'react';

export const WelcomePage = (): JSX.Element => {
	const { conversation_started_request } = useViberRequest();
	if (!conversation_started_request) {
		return <></>;
	}
    return (
        <ViberMessage
            receiver={conversation_started_request.user }
            text={'Hello react viber storybook'}
            keyboard={
				<ViberKeyboard Buttons={
					<>
						<Button name='explore' ActionType='reply' Columns={3} Rows={1} Text="Explore"  />
					</>
				}
				/>
                   
            }
        />
    );
};
