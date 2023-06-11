# react-viber-bot
## scan qr code bellow for live demo in your viber app:


![244617898-73a06e8d-152b-4343-9a87-b263887a656c](https://github.com/mgerasika/react-viber-bot/assets/10614750/0657e3cb-30ad-40c3-aa88-0b285e260482)


With react-viber-bot you can write bot for viber app ([using viber rest api](https://developers.viber.com/docs/api/rest-bot-api/#get-started)) with react library.


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
### Result in your viber app:
![2023-06-09_10-34](https://github.com/mgerasika/react-viber-bot/assets/10614750/701eb99e-95c6-44c6-a775-5661f17a16fb)
![bot2](https://github.com/mgerasika/react-viber-bot/assets/10614750/50e888af-8c37-4461-a3d8-40fa4be08751)
![bot3](https://github.com/mgerasika/react-viber-bot/assets/10614750/01104f89-f94c-4094-884a-a26979a11b97)
![bot4](https://github.com/mgerasika/react-viber-bot/assets/10614750/024a50c2-bc7d-4f59-8477-16a7f6f3b076)
![bot5](https://github.com/mgerasika/react-viber-bot/assets/10614750/f5c98f8c-3f97-4f1e-9cf5-f69d441f3e0d)
