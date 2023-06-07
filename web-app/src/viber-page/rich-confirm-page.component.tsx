import { RichMediaConfirmModal } from '@viber-common/general-ui/rich-media-confirm-modal.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { useServerState } from '@viber-common/hooks/use-server-state.hook';
import { useServerRoute } from '@viber-common/hooks/use-server-route';
import { LINKS } from '@src/constants/links.constant';

export const RichConfirmPage = (): JSX.Element => {
	const {  body_request } = useViberRequest();
	const [text, setText] = useServerState('text', 'Are you sure?');
	const { navigate} = useServerRoute('route');
	const handleOkClick = () => {
		setText('ok');
	};

	const handleCancelClick = () => {
		setText('cancel');

		navigate(LINKS.index.toString());
	};

	if (!body_request) {
		return <></>;
	}
	return (
		<ViberMessage
			receiver={body_request.sender}
			rich_media={
				<RichMediaConfirmModal
					text={text}
					onOkClick={handleOkClick}
					onCancelClick={handleCancelClick}
				/>
					
			}
		/>
	);
};