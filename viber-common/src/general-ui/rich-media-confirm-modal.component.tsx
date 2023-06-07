import { ViberRichMedia } from "@viber-common/viber-components/viber-rich-media.component";
import { Button } from "./button.component";


interface IProps{
	header?: string;
	text: string;
	onOkClick: () => void;
	onCancelClick: () => void;
}
export const RichMediaConfirmModal = ({header = 'Confirm', text, onOkClick, onCancelClick}: IProps): JSX.Element => {
	
	return (
		<ViberRichMedia
			ButtonsGroupColumns={6}
			ButtonsGroupRows={3}
			Buttons={
				<>
					<Button
						name="text"
						Frame={{ BorderWidth: 0 }} ActionType='none' Columns={6} Rows={2} TextHAlign='left'
						Text={`<font color=#323232><b>${header}</b><br></font><font color=#6fc133>${text}</font>`}
					/>
					<Button name="rmcm-ok" ActionType='reply' Text='Ok' Columns={3} Rows={1} onClick={onOkClick} />
					<Button name="rmcm-cancel" ActionType='reply' Text='Cancel' Columns={3} Rows={1} onClick={onCancelClick} />
				</>
			}
		/>
	);
};