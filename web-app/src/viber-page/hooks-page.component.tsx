import { LINKS } from '@src/constants/links.constant';
import {  Button } from '@react-viber/general-ui/button.component';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';
import { useServerState } from '@react-viber/hooks/use-server-state.hook';
import { useServerTimeout } from '@react-viber/hooks/use-server-timeout.hook';
import { useServerQuery } from '@react-viber/hooks/use-server-query.hook';
import { useServerMutation } from '@react-viber/hooks/use-server-mutation.hook';
import { useServerEffect } from '@react-viber/hooks/use-server-effect.hook';
import axios from 'axios';

export const HooksPage = (): JSX.Element => {
	const [enableQuery, setEnableQuery] = useServerState('enableQuery', false);
	const [message, setMessage] = useServerState('message', '');

	const {callback: runTimeout} = useServerTimeout('timeout', () => {
		setMessage(`const {callback: runTimeout} = useServerTimeout('timeout',\n () => { setMessage('This message appear with delay 1000ms'); }, 1000);\n`);
	}, 1000);

	const { data: queryData } = useServerQuery('query', () => axios.get('https://cat-fact.herokuapp.com/facts/').then(data=>data.data), {enabled: enableQuery});
	const { mutate, data: mutateData } = useServerMutation('mutation', () => axios.get('https://cat-fact.herokuapp.com/facts/').then(data=>data.data));


	useServerEffect('s1', () => {
		
		if (queryData) {
			setMessage(JSON.stringify(queryData));
		}
	}, [queryData]);

	
	useServerEffect('s2',() => {
		if (mutateData) {
			setMessage(JSON.stringify(mutateData));
		}
	}, [mutateData]);

	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text={message}
			keyboard={
				<ViberKeyboard
					Buttons={
						<>
							<Button
								name={"useServerState"}
								Text="useServerState"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={() => {
									setMessage(`const [counter, setCounter] = useServerState('counter', 0);\n`);
								}}
							/>
							
							<Button
								name="useServerTimeout"
								Text="useServerTimeout"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={() => {
									runTimeout();
								}}
								
							/>

							<Button
								name="useServerQuery"
								Text="useServerQuery"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={() => setEnableQuery(true)}
							/>

							<Button
								name="useServerMutation"
								Text="useServerMutation"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={() => mutate()}
							/>

							<Button
								name="useServerAction"
								Text="useServerAction"
								ActionType='reply'
								Columns={3}
								Rows={1}
							/>

							<Button
								name="useServerInput"
								Text="useServerInput"
								ActionType='reply'
								Columns={3}
								Rows={1}
							/>
							
							<LinkButton
								name="back"
								ActionType='reply'
								Columns={6}
								Rows={1}
								Text="Back"

								link={
									LINKS.index.toString()
								}

							/>
						</>
					}
				/>
			}
		/>
	);
};
