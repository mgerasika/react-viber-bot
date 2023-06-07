import { LINKS } from '@src/constants/links.constant';
import {  Button } from '@viber-common/general-ui/button.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberCard } from '../../../viber-common/src/general-ui/viber-card.component';
import { ViberRichMedia } from '@viber-common/viber-components/viber-rich-media.component';
import { LinkButton } from '@viber-common/general-ui/link-button.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';


export const ButtonsPage = (): JSX.Element => {
	const { body_request } = useViberRequest();
	if (!body_request) {
		return <></>;
	}
	const items = ['a', 'b', 'c', 'd'];
	return (
		<ViberMessage
			receiver={body_request.sender}
			keyboard={
				<ViberKeyboard
					Buttons={
						<>
							<Button
								name="reply"
								Text="Reply Button"
								ActionType='reply'
								Columns={2}
								Rows={1}

							/>
							<Button
								name="location"
								Text="Location Picker Button"
								ActionType='location-picker'
								Columns={2}
								Rows={1}
							/>
							<Button
								name="share"
								Text="Share Phone Button"
								ActionType='share-phone'
								Columns={2}
								Rows={1}
							/>
							<Button
								name="none"
								Text="None Button"
								ActionType='none'
								Columns={2}
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
			rich_media={
				<ViberRichMedia
					Buttons={
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
