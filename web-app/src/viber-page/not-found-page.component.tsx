import { LINKS } from '@src/constants/links.constant';
import { LinkButton } from '@viber-common/general-ui/link-button.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import React from 'react';

export const NotFoundPage = (): JSX.Element => {
	const { body_request } = useViberRequest();
	if (!body_request) {
		return <></>;
	}
    return (
        <ViberMessage
            receiver={body_request.sender}
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
