import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IViberSubscriberDto } from '@src/dto/viber-subscriber.dto';

import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { useServerQuery } from '@src/viber-components/use-server-query.hook';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export enum EIndexAction {
    sharePhone = 'sharePhone',
    reply = 'open',
}

export const IndexPage = ({ request: { body } }: IProps): JSX.Element => {
    const [currentSubscription] = useServerQuery<IApiResult<IViberSubscriberDto | undefined>>(
        'currentViberSubscription',
        () =>  Promise.resolve({}),
    );

    return (
        <ViberMessage
            sender={body?.sender as IViberSender}
            text={'Привіт! Я чат-бот ОСББ Парус-Смарт. Вибери дію що тебе цікавить'}
            keyboard={
				<ViberKeyboard buttons={<> <ViberButton Columns={2} Rows={1} Text="Новини" onClick={{ link: VIBER_LINKS.news }} />
                    ,
                    <ViberButton Columns={2} Rows={1} Text="Документи" onClick={{ link: VIBER_LINKS.documents }} />
                    ,
                    <ViberButton Columns={2} Rows={1} Text="Часті питання" onClick={{ link: VIBER_LINKS.faq }} />
                    ,
                    <ViberButton Columns={2} Rows={1} Text="Опитування" onClick={{ link: VIBER_LINKS.feedback }} />
                    ,
                    <ViberButton Columns={2} Rows={1} Text="Контакти" onClick={{ link: VIBER_LINKS.contacts }} />
                    ,
                    <ViberButton
                        ActionType={currentSubscription?.data?.phone_number ? 'reply' : 'share-phone'}
                        Columns={2}
                        Rows={1}
                        Text="Особистий кабінет"
                        onClick={{
                            link: VIBER_LINKS.personal,
                            actionName: currentSubscription?.data?.phone_number
                                ? EIndexAction.reply
                                : EIndexAction.sharePhone,
                        }}
                    />
                    ,
                    <ViberButton Columns={6} Rows={1} Text="Вихід" onClick={{ link: VIBER_LINKS.exit }} />
				</>} />
                   
            }
        />
    );
};
