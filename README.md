# react-viber-bot

## scan qr code bellow for live demo in your viber app:

![244617898-73a06e8d-152b-4343-9a87-b263887a656c](https://github.com/mgerasika/react-viber-bot/assets/10614750/0657e3cb-30ad-40c3-aa88-0b285e260482)

With react-viber-bot you can write bot for viber app ([using viber rest api](https://developers.viber.com/docs/api/rest-bot-api/#get-started)) with react library.

First of all you need register webhook [here](https://developers.viber.com/docs/api/rest-bot-api/#setting-a-webhook)

Demo video:
[viber-bot.webm](https://github.com/mgerasika/react-viber-bot/assets/10614750/51f3c948-4913-463a-bb62-e66a78396ca8)


## Install

```sh
npm install react-viber
```
or 
```sh
yarn add react-viber
```

## Usage

## Contents

- [Getting Started](#getting-started)
- [Hooks](#hooks)
  - [useServerState](#useserverstate)
  - [useServerTimeout](#useservertimeout)
  - [useServerQuery](#useserverquery)
  - [useServerMutation](#useservermutation)


### Getting Started
In this example used express.js so, first of all install express.js and all dependencies.
After that, add callback for your web hook:

```jsx
// index.ts
import {renderToStringAsync} from 'react-viber-bot';
import {App} from 'app.component';
...
expressApp.post("/web_hook", async (req,res) => {
	const {status, message} = await renderToStringAsync(<App />, req);
	res.status(status).send(message);
});
```

```jsx
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

## Hooks

### useServerState

```jsx
const [message, setMessage] = useServerState('message', '');
```

```jsx
export const Example = (): JSX.Element => {
	const [message, setMessage] = useServerState('message', '');

	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text={message}
			keyboard={
				<ViberKeyboard
					Buttons={
							<Button
								name={"button_server_state"}
								Text="Server state example"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={() => {
									setMessage('hello world');
								}}
							/>
					}
				/>
			}
		/>
	);
};

```

### useServerTimeout

```jsx
const {callback} = useServerTimeout('callback', () => console.log('hello world), 1000);
```

```jsx
export const Example = (): JSX.Element => {
	const {callback} = useServerTimeout('callback', () => console.log('hello world), 1000);

	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text={message}
			keyboard={
				<ViberKeyboard
					Buttons={
							<Button
								name={"button_timeout"}
								Text="Timeout example"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={callback}
							/>
					}
				/>
			}
		/>
	);
};

```

### useServerQuery

```jsx
const {data} = useServerQuery('query', () => axios.get('https://cat-fact.herokuapp.com/facts/'));
```

```jsx
export const Example = (): JSX.Element => {
	const {data} = useServerQuery('query', () => axios.get('https://cat-fact.herokuapp.com/facts/'));

	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text={data}
		/>
	);
};

```

### useServerMutation

```jsx
const {mutate} = useServerMutation('mutation', (data) => axios.post('https://cat-fact.herokuapp.com/facts/', data));
```

```jsx
export const Example = (): JSX.Element => {
	const {mutate} = useServerMutation('mutation', () => axios.get('https://cat-fact.herokuapp.com/facts/'));

	const { message_request } = useViberRequest();
	if (!message_request) {
		return <></>;
	}
	return (
		<ViberTextMessage
			receiver={message_request.sender}
			text={data}
			keyboard={
				<ViberKeyboard
					Buttons={
							<Button
								name={"button_mutate"}
								Text="Mutation example"
								ActionType='reply'
								Columns={3}
								Rows={1}
								onClick={mutate}
							/>
					}
				/>
			}
		/>
	);
};

```

### Screenshots:

![bot2](https://github.com/mgerasika/react-viber-bot/assets/10614750/50e888af-8c37-4461-a3d8-40fa4be08751)
![bot3](https://github.com/mgerasika/react-viber-bot/assets/10614750/01104f89-f94c-4094-884a-a26979a11b97)
![bot4](https://github.com/mgerasika/react-viber-bot/assets/10614750/024a50c2-bc7d-4f59-8477-16a7f6f3b076)
![bot5](https://github.com/mgerasika/react-viber-bot/assets/10614750/f5c98f8c-3f97-4f1e-9cf5-f69d441f3e0d)
