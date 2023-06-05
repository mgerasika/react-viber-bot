import { LINKS } from '@src/constants/links.constant';
import { IViberBodyRequest } from '@src/interfaces/viber-request.interface';
import { ViberButton } from '@src/viber-components/viber-button.component';
import { ViberCard } from '@src/viber-page/viber-card.component';
import { ViberKeyboard } from '@src/viber-components/viber-keyboard.component';
import { ViberMessage } from '@src/viber-components/viber-message.component';
import { ViberRichMedia } from '@src/viber-components/viber-rich-media.component';

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
