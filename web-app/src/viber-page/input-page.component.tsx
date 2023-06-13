import { useServerInput } from '@react-viber/hooks/use-server-input.hook';
import { LINKS } from '@src/constants/links.constant';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { useServerState } from '@react-viber/hooks/use-server-state.hook';
import { Button } from '@react-viber/general-ui/button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';

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