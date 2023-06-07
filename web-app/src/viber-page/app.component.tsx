import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import { ButtonsPage } from './buttons-page.component';
import { ExitPage } from './exit-page.component';
import { NotFoundPage } from './not-found-page.component';
import { WelcomePage } from './welcome-page.component';
import { LINKS } from '@src/constants/links.constant';
import { RichConfirmPage } from './rich-confirm-page.component';
import { LinkButton } from '@viber-common/general-ui/link-button.component';
import { ViberKeyboard } from '@viber-common/viber-components/viber-keyboard.component';
import { ViberMessage } from '@viber-common/viber-components/viber-message.component';
import { InputPage } from './input-page.component';


export const App = (): JSX.Element => {
	const {actionArg, body_request} = useViberRequest();
   
    switch (actionArg.link) {
		case LINKS.index.toString():
			if (!body_request) {
				return <></>
			}
			return <ViberMessage
				receiver={body_request.sender}
				text={'Hi, I am chatbot for viber react components'}
				keyboard={
					<ViberKeyboard Buttons={
						<>
							<LinkButton name='buttons' ActionType='reply' Columns={3} Rows={1} Text="Buttons" link={LINKS.buttons.toString()} />
							<LinkButton name="input" ActionType='reply' Columns={3} Rows={1} Text="Input" link={LINKS.input.toString()} />
							<LinkButton name='rich-confirm-modal'
								ActionType='reply' Columns={3} Rows={1} Text="Rich Confirm" link={LINKS.rich_confirm.toString()} />
								
							<LinkButton name='exit' ActionType='reply' Columns={6} Rows={1} Text="Exit" link={LINKS.exit.toString()} />
						</>
					} />
                   
				}
			/>;
		
		case LINKS.welcome.toString():
            return <WelcomePage />;


        case LINKS.exit.toString():
            return <ExitPage  />;


		case LINKS.input.toString():
			return <InputPage />;
		
		
		case LINKS.rich_confirm.toString():
            return <RichConfirmPage />;

        case LINKS.buttons.toString():
            return <ButtonsPage  />;

        default:
            return <NotFoundPage  />;
    }
};
