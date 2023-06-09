# react-viber-bot

![244617898-73a06e8d-152b-4343-9a87-b263887a656c](https://github.com/mgerasika/react-viber-bot/assets/10614750/0657e3cb-30ad-40c3-aa88-0b285e260482)


With react-viber-bot you can write app for viber app ([using viber rest api](https://developers.viber.com/docs/api/rest-bot-api/#get-started)) with react library.
```
export const HelloWorldPage = (): JSX.Element => {
	const { message_request } = useViberRequest();
	return (
		<ViberMessage
			receiver={message_request.sender}
			text='Hello world'
		/>
	);
};
```
