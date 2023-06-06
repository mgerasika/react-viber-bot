import { LINKS } from '@src/constants/links.constant';
import { IViberBodyRequest } from '@viber-common/interfaces/viber-request.interface';
import { ViberButton } from '@viber-common/viber-components/viber-button.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberCard } from './viber-card.component';
import { ViberRichMedia } from '@viber-common/viber-components/viber-rich-media.component';


interface IProps {
	request: IViberBodyRequest;
}

export const DocumentsPage = ({ request: { actionArg, body } }: IProps): JSX.Element => {
	const items = ['a', 'b', 'c', 'd'];
	return (
		<ViberMessage
			receiver={body.sender}
			keyboard={
				<ViberKeyboard
					buttons={
						<>
							<ViberButton
								Text="Reply Button"
								actionType='reply'
								Columns={2}
								Rows={1}
								actionBody={actionArg}

							/>
							<ViberButton
								Text="Location Picker Button"
								actionType='location-picker'
								Columns={2}
								Rows={1}
								actionBody={actionArg}
							/>
							<ViberButton
								Text="Share Phone Button"
								actionType='share-phone'
								Columns={2}
								Rows={1}
								actionBody={actionArg}
							/>
							<ViberButton
								Text="None Button"
								actionType='none'
								Columns={2}
								Rows={1}
								actionBody={actionArg}
							/>
							<ViberButton
								Text="Open Url Button"
								href='https://google.com.ua'
								actionType='open-url'
								Columns={2}
								Rows={1}
								actionBody={actionArg}
							/>
							
							<ViberButton
								actionType='reply'
								Columns={6}
								Rows={1}
								Text="Back"

								actionBody={{
									...actionArg,
									link: LINKS.index
								}}

							/>
						</>
					}
				/>
			}
			rich_media={
				<ViberRichMedia
					buttons={
						<>
							{items.map((article) => (
								<div key={article}>
									<ViberCard
										link={`#${article}`}
										id={article}
										title={article}
										description={article}
									/>
								</div>
							))}
						</>}
				/>

			}
		/>
	);
};
