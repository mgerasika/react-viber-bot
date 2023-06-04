import { LINKS } from "@src/constants/links.constant";
import { IViberActionArg } from "@src/interfaces/viber-action-arg.interface";
import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";

interface IClickArgs{
	actionName: string;
	actionArgument: any;
}
export function useServerCallback(name: string, callback: (args: IClickArgs) => void): IViberActionArg {
	const key = useUnique('useServerCallback', name);
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

	const request = context.request;
	const result: IViberActionArg = { actionName: key, link: request.actionArg?.link || '' };

	if ( !context.hasFinishedPromise(key) &&  request?.actionArg?.link === result.link && request.actionArg.actionName === result.actionName) {
		callback({ actionName: request.actionArg.actionName || '', actionArgument: request.actionArg.actionArgument });
			context.updatePromiseResult(key,{
			isFinished:true
		});
	}
	return result;
}