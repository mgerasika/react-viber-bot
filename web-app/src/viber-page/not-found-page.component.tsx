import { LINKS } from '@src/constants/links.constant';
import { LinkButton } from '@viber-common/general-ui/link-button.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberTextMessage } from '@viber-common/viber-components/viber-text-message.component';
import React from 'react';

export const NotFoundPage = (): JSX.Element => {
	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
    return (
        <ViberTextMessage
            receiver={message_request.sender}
            text={'Page not found'}
            keyboard={
				<ViberKeyboard Buttons={
					<>
						<LinkButton name='main' ActionType='reply' Columns={3} Rows={1} Text="Main" link={LINKS.index.toString()} />
						<LinkButton name='exit' ActionType='reply' Columns={3} Rows={1} Text="Exit" link={''}  />
					</>
				}
				/>
                   
            }
        />
    );
};
