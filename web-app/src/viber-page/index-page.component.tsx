import { LINKS } from '@src/constants/links.constant';
import { IViberBodyRequest } from '@src/interfaces/viber-request.interface';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberBodyRequest;
}

export const IndexPage = ({ request: { body } }: IProps): JSX.Element => {
    return (
        <ViberMessage
            receiver={body?.sender }
            text={'Привіт! Я чат-бот ОСББ Парус-Смарт. Вибери дію що тебе цікавить'}
            keyboard={
				<ViberKeyboard buttons={
					<>
						<ViberButton actionType='reply' Columns={3} Rows={1} Text="News" actionBody={{ link: LINKS.news }} />
						<ViberButton actionType='reply'  Columns={3} Rows={1} Text="Documents" actionBody={{ link: LINKS.documents }} />
						<ViberButton actionType='reply'  Columns={6} Rows={1} Text="Exit" actionBody={{ link: LINKS.exit }} />
					</>
				} />
                   
            }
        />
    );
};
