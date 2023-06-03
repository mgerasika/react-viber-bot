import { IFaqDto } from '@src/dto/faq.dto';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';

import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { calcPaging } from '@src/utils/calc-paging.util';
import { Paging } from '@src/viber-components/paging.component';
import { useServerQuery } from '@src/viber-components/use-server-query.hook';
import { ViberCard } from '@src/viber-components/viber-card.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { ViberRichMedia } from '@src/viber-components/viber-rich-media.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const FaqPage = ({ request: { actionArg, body } }: IProps): JSX.Element => {
    const [faqs] = useServerQuery<IApiResult<IFaqDto[]>>( 'faq',() => Promise.resolve({}),);

    const link = actionArg?.link;
    const currentPage = actionArg.actionArgument || 0;
    const { items, totalPages } = calcPaging({
        currentPage,
        inputItems: faqs?.data || [],
    });

    return (
        <ViberMessage
            sender={body?.sender as IViberSender}
            keyboard={
                <ViberKeyboard>
                    <Paging currentPage={currentPage} link={link} totalPages={totalPages} />
                </ViberKeyboard>
            }
            rich_media={
                <ViberRichMedia>
                    {items.map((faq, index) => (
                        <div key={faq.id}>
                            <ViberCard
                                id={faq.id}
                                link={`faq#${faq.id}`}
                                title={faq.name}
                                description={faq.content}
                            />
                            {index !== items.length - 1 ? ',' : null}
                        </div>
                    ))}
                </ViberRichMedia>
            }
        />
    );
};
