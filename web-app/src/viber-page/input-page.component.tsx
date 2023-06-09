import { useServerInput } from '@viber-common/hooks/use-server-input.hook';
import { LINKS } from '@src/constants/links.constant';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { LinkButton } from '@viber-common/general-ui/link-button.component';
import { useServerState } from '@viber-common/hooks/use-server-state.hook';
import { Button } from '@viber-common/general-ui/button.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { ViberTextMessage } from '@viber-common/viber-components/viber-text-message.component';

export const InputPage = (): JSX.Element => {
	const { message_request } = useViberRequest() ;
	const [text, setText] = useServerState('text','Enter first name');
	
	useServerInput((e) => {
		console.log('once?')
		setText('useServerInput callback = '+JSON.stringify(e));
	});

	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text={text}
			keyboard={
				<ViberKeyboard
					Buttons={
						<>
							<Button name="echo" Text='Echo' ActionType='reply' Columns={6} Rows={1}  />
							<LinkButton name="back" Text='Back' ActionType='reply' Columns={6} Rows={1} link={LINKS.index.toString()} />
						</>
					}
			/>}
		/>
	);
};