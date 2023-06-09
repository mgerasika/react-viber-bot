import { RichMediaConfirmModal } from '@viber-common/general-ui/rich-media-confirm-modal.component';
import { ViberRichMessage } from '@viber-common/viber-components/viber-rich-message.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { useServerState } from '@viber-common/hooks/use-server-state.hook';
import { LINKS } from '@src/constants/links.constant';
import { LinkButton } from '@viber-common/general-ui/link-button.component';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';

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