import { API_URLS } from "./constants/api-urls.constant";

export const ENV = {
	VIBER_WEB_HOOK: process.env.VIBER_WEB_HOOK +API_URLS.webhook,
	PROXY_WEB_HOOK: process.env.PROXY_WEB_HOOK+ API_URLS.proxy_web_hook,
	VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN 
};