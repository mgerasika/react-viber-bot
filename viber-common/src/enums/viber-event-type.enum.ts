export enum EViberEventType {
    delivered = 'delivered',
    seen = 'seen',
    failed = 'failed',
    subscribed = 'subscribed',
    unsubscribed = 'unsubscribed',
    message = 'message',
    conversation_started = 'conversation_started',
}

// [1] webhook_request body =  {
// 	[1]   event: 'unsubscribed',
// 	[1]   timestamp: 1686505037405,
// 	[1]   chat_hostname: 'SN-390_',
// 	[1]   user_id: 'XndB4Slzt7KPA38CafS8GA==',
// 	[1]   message_token: 5848735725766687000
// 	[1] }




// webhook_request body =  {
// 	[1]   event: 'conversation_started',
// 	[1]   timestamp: 1686505083826,
// 	[1]   chat_hostname: 'SN-390_',
// 	[1]   message_token: 5848735920470473000,
// 	[1]   type: 'open',
// 	[1]   user: {
// 	[1]     id: 'XndB4Slzt7KPA38CafS8GA==',
// 	[1]     name: 'Mykhaylo H',
// 	[1]     avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=AU6FiUDeJ9qIdPVQhy1ULQYz-MNhY-OS0KNXjgO3qHt6l5muiis4NrZgyb--QDiNZY3jI9hRKu1QNspo6RcfZulyewUdMwgj_U8dXN7Wbi1RcZ5EKAlMQjgWJdct8qIlYAzmWA&fltp=jpg&imsz=0000',
// 	[1]     language: 'en-GB',
// 	[1]     country: 'UA',
// 	[1]     api_version: 8
// 	[1]   },
// 	[1]   subscribed: false
// 	[1] }
// 	[1] subscribe {
// 	[1]   event: 'conversation_started',
// 	[1]   timestamp: 1686505083826,
// 	[1]   chat_hostname: 'SN-390_',
// 	[1]   message_token: 5848735920470473000,
// 	[1]   type: 'open',
// 	[1]   user: {
// 	[1]     id: 'XndB4Slzt7KPA38CafS8GA==',
// 	[1]     name: 'Mykhaylo H',
// 	[1]     avatar: 'https://media-direct.cdn.viber.com/download_photo?dlid=AU6FiUDeJ9qIdPVQhy1ULQYz-MNhY-OS0KNXjgO3qHt6l5muiis4NrZgyb--QDiNZY3jI9hRKu1QNspo6RcfZulyewUdMwgj_U8dXN7Wbi1RcZ5EKAlMQjgWJdct8qIlYAzmWA&fltp=jpg&imsz=0000',
// 	[1]     language: 'en-GB',
// 	[1]     country: 'UA',
// 	[1]     api_version: 8
// 	[1]   },
// 	[1]   subscribed: false
// 	[1] }