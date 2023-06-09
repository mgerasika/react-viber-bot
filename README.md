# viber-bot

Write

```
export const ButtonsPage = (): JSX.Element => {
	const { body_request } = useViberRequest();
	if (!body_request) {
		return <></>;
	}
	return (
		<ViberMessage
			receiver={body_request.sender}
			text='Reply button example'
			keyboard={
				<ViberKeyboard
					Buttons={
						<Button
							name="reply"
							Text="Reply Button"
							ActionType='reply'
							Columns={2}
							Rows={1}
						/>
					}
				/>
			}
		/>
	);
};
```
