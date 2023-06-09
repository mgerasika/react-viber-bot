import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import { ButtonsPage } from './buttons-page.component';
import { ExitPage } from './exit-page.component';
import { NotFoundPage } from './not-found-page.component';
import { WelcomePage } from './welcome-page.component';
import { LINKS } from '@src/constants/links.constant';
import { RichConfirmPage } from './rich-confirm-page.component';
import { LinkButton } from '@react-viber/general-ui/link-button.component';
import { ViberKeyboard } from '@react-viber/viber-components/viber-keyboard.component';
import { ViberTextMessage } from '@react-viber/viber-components/viber-text-message.component';
import { InputPage } from './input-page.component';
import { MessagesPage } from './messages-page.component';
import { HooksPage } from './hooks-page.component';


export const App = (): JSX.Element => {
	const {actionArg, message_request, conversation_started_request} = useViberRequest();
   
	if (conversation_started_request) {
		return <WelcomePage />;
	}
    switch (actionArg.link) {
		case LINKS.index.toString():
			if (!message_request) {
				return <></>;
			}
			return <ViberTextMessage
				receiver={message_request.sender}
				text={'Select what you want to explore'}
				keyboard={
					<ViberKeyboard Buttons={
						<>
							<LinkButton name='messages-page'
								ActionType='reply' Columns={2} Rows={1} Text="Messages" link={LINKS.messages.toString()} />
							
							<LinkButton name='hooks-page'
								ActionType='reply' Columns={2} Rows={1} Text="Hooks" link={LINKS.hooks.toString()} />
							
							<LinkButton name='buttons' ActionType='reply' Columns={2} Rows={1} Text="Buttons" link={LINKS.buttons.toString()} />
							<LinkButton name="input" ActionType='reply' Columns={3} Rows={1} Text="Input" link={LINKS.input.toString()} />
							<LinkButton name='rich-confirm-page'
								ActionType='reply' Columns={3} Rows={1} Text="Rich Confirm" link={LINKS.rich_confirm.toString()} />
							
								
							<LinkButton name='back' ActionType='reply' Columns={6} Rows={1} Text="Back" link={LINKS.index.toString()} />
						</>
					} />
                   
				}
			/>;
		
		case LINKS.hooks.toString():
			return <HooksPage />;
		
		case LINKS.messages.toString():
            return <MessagesPage />;


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
