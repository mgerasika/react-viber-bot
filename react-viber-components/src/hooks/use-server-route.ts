import { LINKS } from "@src/constants/links.constant";
import { IViberActionArg } from "@src/interfaces/viber-action-arg.interface";
import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";
import { IViberRequest } from "@src/interfaces/viber-request.interface";

interface IClickArgs{
	actionName: string;
	actionArg: any;
}
export function useServerRoute(name: string):  { navigate: (url:string) => void} {
	const key = useUnique('useServerRoute', name);
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

	
	return {
		navigate: (url: string) => {
			if (!context.hasFinishedPromise(key)) {
				context.addPromise(new Promise(resolve => {
					resolve('');
					context.request.actionArg = {
						link: url
					};
					context.updatePromiseResult(key, {
						isFinished: true
					});
				}));
				
			}
		}
	};
}