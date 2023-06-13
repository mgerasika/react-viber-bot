import { IViberActionArg } from "@react-viber/interfaces/viber-action-arg.interface";
import { ViberServerContext } from "@react-viber/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";


export function useServerAction(name: string, callback: (args: IViberActionArg) => void): IViberActionArg {
	const key = useUnique('useServerAction', name);
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

	const request = context.request;
	const result: IViberActionArg = { actionName: key, link: request.actionArg?.link || '' };

	if ( !context.hasFinishedPromise(key) &&  request?.actionArg?.link === result.link && request.actionArg.actionName === result.actionName) {
		callback(request.actionArg);
			context.updatePromiseResult(key,{
			isFinished:true
		});
	}
	return result;
}