import { LINKS } from '@src/constants/links.constant';
import { Button } from '@react-viber/general-ui/button.component';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';
import { ViberPictureMessage } from '@react-viber/viber-components/viber-picture-message.component';
import { ViberVideoMessage } from '@react-viber/viber-components/viber-video-message.component';
import { ViberUrlMessage } from '@react-viber/viber-components/viber-url-message.component';
import { useServerState } from '@react-viber/hooks/use-server-state.hook';
import { EViberMessageType } from '@react-viber/enums/viber-message-type.enum';
import { ViberRichMessage } from '@react-viber/viber-components/viber-rich-message.component';
import { ViberRichMedia } from '@react-viber/viber-components/viber-rich-media.component';
import { ViberContactMessage } from '@react-viber/viber-components/viber-contact-message.component';
import { ViberStickerMessage } from '@react-viber/viber-components/viber-sticker-message.component';
import { ViberFileMessage } from '@react-viber/viber-components/viber-file-message.component';
import { ViberLocationMessage } from '@react-viber/viber-components/viber-location-message.component';

export const MessagesPage = (): JSX.Element => {
	const [message, setMessage] = useServerState<EViberMessageType>('message', EViberMessageType.text);
	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}

	const renderKeyboard = () => <ViberKeyboard
		Buttons={
			<>
				<Button
					name="text"
					Text="Text Message"
					ActionType='reply'
					Columns={2}
					onClick={() => setMessage(EViberMessageType.text)}
					Rows={1}
				/>

				<Button
					name="rich"
					Text="Rich Message"
					onClick={() => setMessage(EViberMessageType.rich_media)}
					ActionType='reply'
					Columns={2}
					Rows={1}
				/>

				<Button
					name="picture"
					Text="Picture Message"
					ActionType='reply'
					onClick={() => setMessage(EViberMessageType.picture)}
					Columns={2}
					Rows={1}
				/>

				<Button
					name="video"
					Text="Video Message"
					ActionType='reply'
					onClick={() => setMessage(EViberMessageType.video)}
					Columns={2}
					Rows={1}
				/>

				<Button
					name="file"
					Text="File Message"
					ActionType='reply'
					Columns={2}
					onClick={() => setMessage(EViberMessageType.file)}
					Rows={1}
				/>

				<Button
					name="location"
					Text="Location Message"
					ActionType='reply'
					Columns={2}
					onClick={() => setMessage(EViberMessageType.location)}
					Rows={1}
				/>

				<Button
					name="contact"
					Text="Contact Message"
					ActionType='reply'
					Columns={2}
					onClick={() => setMessage(EViberMessageType.contact)}
					Rows={1}
				/>

				<Button
					name="sticker"
					Text="Sticker Message"
					ActionType='reply'
					Columns={2}
					onClick={() => setMessage(EViberMessageType.sticker)}
					Rows={1}
				/>

<Button
					name="url"
					Text="Url Message"
					ActionType='reply'
					Columns={2}
					onClick={() => setMessage(EViberMessageType.url)}
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
	/>;

	switch (message) {
		case EViberMessageType.text:
			return <ViberTextMessage
				receiver={message_request.sender}
				text='Example of messages'
				keyboard={renderKeyboard()}
			/>;
		
			case EViberMessageType.location:
				return <ViberLocationMessage
					receiver={message_request.sender}
					location={{lat:'37.7898', lon:'-122.3942'}}
					keyboard={renderKeyboard()}
				/>;
		
				case EViberMessageType.sticker:
					return <ViberStickerMessage
						receiver={message_request.sender}
						sticker_id={46105}
						keyboard={renderKeyboard()}
					/>;
		
					case EViberMessageType.contact:
					return <ViberContactMessage
						receiver={message_request.sender}
						contact={{name:'MH', phone_number:'+380999999'}}
						keyboard={renderKeyboard()}
					/>;
		
					case EViberMessageType.file:
					return <ViberFileMessage
						receiver={message_request.sender}
						keyboard={renderKeyboard()}
						media="https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/2269px-Honeycrisp-Apple.jpg"
						sizeInBytes={10000}
						file_name="apple.jpg"
					/>;
		
					case EViberMessageType.url:
						return <ViberUrlMessage
							receiver={message_request.sender}
							keyboard={renderKeyboard()}
							media="https://google.com"
						/>;
		
		case EViberMessageType.picture:
			return			<ViberPictureMessage
					receiver={message_request.sender}
					text='Example of messages'
					keyboard={renderKeyboard()}
					media={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Honeycrisp-Apple.jpg/2269px-Honeycrisp-Apple.jpg'}
				thumbnail={'https://www.altmarkt-galerie-dresden.de/fileadmin/user_upload/GLOBAL/brand_stores/logos/apple.jpg'} />;
		
		case EViberMessageType.video:
			return	<ViberVideoMessage
						receiver={message_request.sender}
						text='Example of messages'
						keyboard={renderKeyboard()}
						media={'http://techslides.com/demos/sample-videos/small.mp4'}
						sizeInBytes={144 * 1024}
						durationInSeconds={5}
							thumbnail={'https://www.altmarkt-galerie-dresden.de/fileadmin/user_upload/GLOBAL/brand_stores/logos/apple.jpg'} />;

		case EViberMessageType.rich_media:
			return <ViberRichMessage
				receiver={message_request.sender}
				keyboard={renderKeyboard()}
				rich_media={
					<ViberRichMedia Buttons={<>
						<Button
							name="contact"
							Text="<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>"
							ActionType='none'
							Columns={6}
							Rows={7}
						/>
					</>}
				/>
				}
			/>;
		default:
			return <ViberTextMessage
				receiver={message_request.sender}
				text='Example of messages'
				keyboard={renderKeyboard()}
			/>;
	}
};
