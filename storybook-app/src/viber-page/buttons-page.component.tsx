import { LINKS } from '@src/constants/links.constant';
import {  Button } from '@react-viber/general-ui/button.component';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';


export const ButtonsPage = (): JSX.Element => {
	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text=''
			keyboard={
				<ViberKeyboard
					Buttons={
						<>
							<Button
								name="reply"
								Text="Reply Button"
								ActionType='reply'
								Columns={3}
								Rows={1}
							/>
							<Button
								name="location"
								Text="Location Picker Button"
								ActionType='location-picker'
								Columns={3}
								Rows={1}
							/>
							<Button
								name="share"
								Text="Share Phone Button"
								ActionType='share-phone'
								Columns={3}
								Rows={1}
							/>
							<Button
								name="none"
								Text="None Button"
								ActionType='none'
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
