import { LINKS } from '@src/constants/links.constant';
import { VIBER_LINKS } from '@src/constants/viber-links.constant';
import { IArticleDto } from '@src/dto/article.dto';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';
import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { calcPaging } from '@src/utils/calc-paging.util';
import { Paging } from '@src/viber-components/paging.component';
import { useServerPromise } from '@src/viber-components/use-server-promise.hook';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberCard } from '@src/viber-components/viber-card.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { ViberRichMedia } from '@src/viber-components/viber-rich-media.component';
import React from 'react';

interface IProps {
    request: IViberRequest;
}

export const DocumentsPage = ({ request: { actionArg, body } }: IProps): JSX.Element => {
    const [articles] = useServerPromise<IApiResult<IArticleDto[]>>(
        undefined,
        'articles',
		() => Promise.resolve({
			data: [{
				content: 'Привіт',
				date: '1212',
				dateObj: 'sdfsdf',
				id: '1',
				name: 'Привіт2'
			}]
		} as any),
    );

    const link = actionArg?.link;
    const currentPage = actionArg.actionArgument || 0;
    const { items } = calcPaging({
        currentPage,
        inputItems: articles?.data || [],
    });
    return (
        <ViberMessage
            type={EViberMessageType.rich_media}
            sender={body?.sender as IViberSender}
            keyboard={
                <ViberKeyboard>
					<ViberButton
						Text="Купи мене"
                ActionType={'reply'}
                Columns={2}
                Rows={1}
                arg={{
                    link,
                    actionName: LINKS.index.toString(),
                    actionArgument: currentPage - 1,
                }}
					/>				 ,
				<ViberButton
					Columns={6}
					Rows={1}
					Text="На головну"
					arg={{
						link: VIBER_LINKS.index,
					}}
				/>
                </ViberKeyboard>
            }
            rich_media={
                <ViberRichMedia>
                    {items.map((article, index) => (
                        <div key={article.id}>
                            <ViberCard
                                link={`#${article.id}`}
                                id={article.id}
                                title={article.name}
                                description={article.content}
                            />
                            {index !== items.length - 1 ? ',' : null}
                        </div>
                    ))}
                </ViberRichMedia>
            }
        />
    );
};
