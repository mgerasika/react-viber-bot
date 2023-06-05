import { LINKS } from '@src/constants/links.constant';
import { useRequest } from '@src/hooks/use-request.hook';
import { useServerMutation } from '@src/hooks/use-server-mutation.hook';
import { useServerRoute } from '@src/hooks/use-server-route';
import { useServerState } from '@src/hooks/use-server-state.hook';
import { useServerTimeout } from '@src/hooks/use-server-timeout.hook';
import { Paging } from '@src/viber-components/paging.component';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { useServerActionBody } from '@src/hooks/use-server-action-body.hook';
import { IViberBodyRequest } from '@src/interfaces/viber-request.interface';


export const NewsPage = (): JSX.Element => {
	
	const { body, actionArg } = useRequest() as IViberBodyRequest;
	const {data, mutate: implantMutate} = useServerMutation<string>(
		'implants',
		() => Promise.resolve( 'implant' ),
	);
	
	const [message, setMessage] = useServerState('message', '&');

	const handleReplyCallback = useServerActionBody('handleReplyButtonClick', () => {
		setMessage('<Button></Button>');
	});
	const handleCancelClick = useServerActionBody('handleCancelClick', (e) => {
		setMessage(e.actionName || '');
	});

		const handleOpenClick = useServerActionBody('handleOpenClick', (e) => {
		setMessage(e.actionName || '');
	});

	const handleSharePhoneClick = useServerActionBody('handleSharePhoneClick', (e) => {
		setMessage(e.actionName || '');
		console.log('share phone callback again????');
	});

	if (body?.message.contact?.phone_number) {
		console.log('phone', body?.message.contact?.phone_number)
	}

	const { callback: request } = useServerTimeout('useServerTimeout', () => {
		setMessage('some code with delay');

		implantMutate();
	}, 2000);

	const handleTimeoutClick = useServerActionBody('handleTimeoutClick', (e) => {
		request();
	});

	const {navigate } = useServerRoute('navigateTo');
	const handleNavigateClick = useServerActionBody('handleNavigateClick', () => {
		navigate(LINKS.index.toString());
	});
	
	const handleChange = (e: number) => {
		console.log('onChange e = ', e);
		setMessage('onChange message');
	};

    return (
        <ViberMessage
            receiver={body.sender}
            keyboard={
				<ViberKeyboard
					buttons={
						<>
							<ViberButton Columns={2} Rows={1} Text='Reply button' actionType='reply' actionBody={handleReplyCallback} />
							<ViberButton Columns={2} Rows={1} Text='Reply button anonymous' actionType='reply' actionBody={actionArg} />
							<ViberButton Columns={2} Rows={1} Text='Open Url button' href={'http://www.google.com'} actionType='open-url' actionBody={handleOpenClick}   />
							<ViberButton Columns={2} Rows={1} Text='Location Picker Button' actionType='location-picker' actionBody={handleCancelClick} />
							<ViberButton Columns={2} Rows={1} Text='Share Phone Button' actionType='share-phone' actionBody={handleSharePhoneClick} />
							<ViberButton Columns={2} Rows={1} Text='None Button' actionType='none' actionBody={handleCancelClick} />
							<ViberButton Columns={2} Rows={1} Text='Timeout' actionType='reply' actionBody={handleTimeoutClick} />
							<ViberButton Columns={2} Rows={1} Text='Navigate from here' actionType='reply' actionBody={handleNavigateClick} />
							
							<ViberButton Columns={2} Rows={1} Text='Server Route' actionType='reply' actionBody={handleTimeoutClick} />
							<Paging currentPage={+actionArg?.actionArgument || 0} totalPages={3} onChange={handleChange} />
							
							<ViberButton Columns={6} Rows={1} Text='Back' actionType='reply' actionBody={{link: LINKS.index.toString()}} />
						</>
					}
				/>
					
            }

			text={ message + ' - ' + JSON.stringify(data)}
            
        />
    );
};
