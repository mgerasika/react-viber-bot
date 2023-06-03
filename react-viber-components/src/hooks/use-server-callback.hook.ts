import { LINKS } from "@src/constants/links.constant";
import { IViberActionArg } from "@src/interfaces/viber-action-arg.interface";
import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";

interface IClickArgs{
	actionName: string;
	actionArg: any;
}
export function useServerCallback(key: string, callback: (args: IClickArgs) => void): IViberActionArg {
	const context = useContext(ViberServerContext);
	const request = context.request;
	const result: IViberActionArg = { actionName: key, link: LINKS.news.toString() }

	if ( !Object.keys(context.promiseResults).includes(key) &&  request?.actionArg?.link === result.link && request.actionArg.actionName === result.actionName) {
		callback({ actionName: request.actionArg.actionName || '', actionArg: request.actionArg.actionArgument });
		context.promiseResults[key] = true;
	}
	return result;
}