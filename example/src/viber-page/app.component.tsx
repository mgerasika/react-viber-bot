import { useViberRequest, ViberTextMessage, ViberKeyboard, Button } from "react-viber";

export const App = (): JSX.Element => {
	const { message_request } = useViberRequest();
	
	if (!message_request) {
		return <></>;
	}
    return (
        <ViberTextMessage
            receiver={message_request.sender }
            text={'Hi, this is simple viber bot written in react library. Explore react components bellow'}
            keyboard={
				<ViberKeyboard Buttons={
					<Button name='explore' ActionType='reply' Columns={6} Rows={1} Text="Explore"  />
				}
				/>
                   
            }
        />
    );
};
