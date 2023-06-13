import { LINKS } from '@src/constants/links.constant';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';
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
