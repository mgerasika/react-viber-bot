import { LINKS } from '@src/constants/links.constant';
import { IArticleDto } from '@src/dto/article.dto';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';
import { useRequest } from '@src/hooks/use-request.hook';
import { useServerCallback } from '@src/hooks/use-server-callback.hook';
import { useServerMutation } from '@src/hooks/use-server-mutation.hook';
import { useServerState } from '@src/hooks/use-server-state.hook';
import { useServerTimeout } from '@src/hooks/use-server-timeout.hook';
import { IApiResult } from '@src/interfaces/api-result.interface';
import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberSender } from '@src/interfaces/viber-sender.interface';
import { ViberServerContext } from '@src/shared/viber-server.context';
import { calcPaging } from '@src/utils/calc-paging.util';
import { Paging } from '@src/viber-components/paging.component';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberCard } from '@src/viber-components/viber-card.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { ViberRichMedia } from '@src/viber-components/viber-rich-media.component';
import React, { useCallback, useContext, useReducer, useState } from 'react';





export const NewsPage = (): JSX.Element => {
	
	const { body } = useRequest();
	const {data, mutate: implantMutate} = useServerMutation<string>(
		'implants',
		() => Promise.resolve( 'implant' ),
	);
	
	const [message, setMessage] = useServerState('message', '&');

	const handleReplyButtonClick = useServerCallback('okClick', (e) => {
		setMessage('<Button></Button>');
	});
	const handleCancelClick = useServerCallback('okClick1', (e) => {
		setMessage(e.actionName);
	});
	
	const handleBackClick = useServerCallback('server-callback', (e) => {
		const context = useContext(ViberServerContext);
		context.request.actionArg = {
			link: LINKS.index.toString()
		};
	});

	const { callback: request } = useServerTimeout('timeout', () => {
		setMessage('some code with delay');

		implantMutate();
	}, 2000);

	const handleTimeoutClick = useServerCallback('timeoutClick', (e) => {
		request();
	});
	
    return (
        <ViberMessage
            sender={body?.sender}
            keyboard={
				<ViberKeyboard
					buttons={<>
						<ViberButton Columns={2} Rows={1} Text='Reply button' actionType='reply' onClick={handleReplyButtonClick} />
						<ViberButton Columns={2} Rows={1} Text='Open Url button' href={'http://www.google.com'} actionType='open-url' onClick={handleCancelClick}   />
						<ViberButton Columns={2} Rows={1} Text='Location Picker Button' actionType='location-picker' onClick={handleCancelClick} />
						<ViberButton Columns={2} Rows={1} Text='Share Phone Button' actionType='share-phone' onClick={handleCancelClick} />
						<ViberButton Columns={2} Rows={1} Text='None Button' actionType='none' onClick={handleCancelClick} />
						<ViberButton Columns={2} Rows={1} Text='Timeout' actionType='reply' onClick={handleTimeoutClick} />
						<ViberButton Columns={2} Rows={1} Text='Back' actionType='reply' onClick={{ actionName: 'На головну', link: LINKS.index.toString() }} />
						<ViberButton Columns={2} Rows={1} Text='Back' actionType='reply' onClick={handleBackClick} />
					</>}
				/>
					
            }

			text={ message + ' - ' + JSON.stringify(data)}
            
        />
    );
};
