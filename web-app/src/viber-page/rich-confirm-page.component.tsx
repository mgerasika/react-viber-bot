import { RichMediaConfirmModal } from '@react-viber/general-ui/rich-media-confirm-modal.component';
import { ViberRichMessage } from '@react-viber/viber-components/viber-rich-message.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { useServerState } from '@react-viber/hooks/use-server-state.hook';
import { LINKS } from '@src/constants/links.constant';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';

export const RichConfirmPage = (): JSX.Element => {
	const {  message_request } = useViberRequest();
	const [text, setText] = useServerState('text', 'Are you sure?');
	const handleOkClick = () => {
		setText('ok clicked');
	};

	const handleCancelClick = () => {
		setText('cancel clicked');
	};

	if (!message_request) {
		return <></>;
	}
	return (
		<ViberRichMessage
			receiver={message_request.sender}
			rich_media={
				<RichMediaConfirmModal
					text={text}
					onOkClick={handleOkClick}
					onCancelClick={handleCancelClick}
				/>
			}
			keyboard={
					<ViberKeyboard Buttons={
						<LinkButton name='back' ActionType='reply' Columns={6} Rows={1} Text="Back" link={LINKS.index.toString()} />
					} />
                   
				}
		/>
	);
};