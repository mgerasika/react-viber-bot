# react-viber-bot
## scan qr code bellow for live demo in your viber app:


![244617898-73a06e8d-152b-4343-9a87-b263887a656c](https://github.com/mgerasika/react-viber-bot/assets/10614750/0657e3cb-30ad-40c3-aa88-0b285e260482)


With react-viber-bot you can write bot for viber app ([using viber rest api](https://developers.viber.com/docs/api/rest-bot-api/#get-started)) using react library.


First of all you need register webhook [here](https://developers.viber.com/docs/api/rest-bot-api/#setting-a-webhook)

After that, add callback for your web hook:
```
// index.ts
import {createExpressCallback} from 'react-viber-bot';
import {App} from 'app.component';
...
const expressCallback = createExpressCallback(<App />);
expressApp.post("/web_hook", expressCallback);
```


```
// app.component.tsx
export const App = (): JSX.Element => {
	const { message_request } = useViberRequest();
	return (
		<ViberMessage
			receiver={message_request.sender}
			text='Hello world'
		/>
	);
};
```
// result
![2023-06-09_10-34](https://github.com/mgerasika/react-viber-bot/assets/10614750/701eb99e-95c6-44c6-a775-5661f17a16fb)
