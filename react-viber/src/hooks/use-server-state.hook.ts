import { ViberServerContext } from "@react-viber/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";

export function useServerState<T = any>(name: string, initial: T): [T | typeof initial, ((newValue: T) => void)] {
	const key = useUnique('useServerState', name);
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});
	
	const value = context.getPromiseResult(key)?.data || initial;
	return [value, (newVal) => {
		if (newVal !== value) {
			context.addPromise(new Promise(resolve => {
				context.updatePromiseResult(key, {
					isFinished: true,
					data: newVal
				});
				resolve('');
			}));
		}
	}];
}
