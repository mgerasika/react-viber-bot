import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";

export function useServerState<T = any>(name: string, initial?: T): [T | undefined, ((newValue: T) => void)] {
	const key = useUnique('useServerState', name);
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});
	
	const value = context.getPromiseResult(key)?.data || initial;
	return [value, (newVal) => {
		context.addPromise(new Promise(resolve => {
			context.updatePromiseResult(key,  {
				isFinished: true,
				data: newVal
			})
			resolve('');
		}));
	}];
}
