import { ViberServerContext } from "@viber-common/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";

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