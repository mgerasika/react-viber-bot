import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IPageDto } from '@src/dto/page.dto';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';

import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { getViberBigText } from '@src/viber-components/get-viber-big-text';
import { useServerQuery } from '@src/viber-components/use-server-query.hook';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const FeedbackPage = ({ request: { body } }: IProps): JSX.Element => {
    const [pages] = useServerQuery<IApiResult<IPageDto[]>>( 'pages', () => Promise.resolve({}),);

    const page = pages?.data?.find((page) => page.type === 'feedback');
    return (
        <ViberMessage
            sender={body?.sender as IViberSender}
            keyboard={
                <ViberKeyboard>
                    <ViberButton Columns={6} Rows={1} Text="На головну" onClick={{ link: VIBER_LINKS.index }} />
                </ViberKeyboard>
            }
            text={
                page
                    ? getViberBigText({
                          id: page.id,
                          description: page.content,
                          link: `feedback`,
                          title: page.name,
                      })
                    : undefined
            }
        />
    );
};
