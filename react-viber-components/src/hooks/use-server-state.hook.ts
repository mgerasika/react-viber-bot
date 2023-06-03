import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";

export function useServerState<T = any>(key: string, initial?: T): [T | undefined, ((newValue: T  ) => void) ] {
	const context = useContext(ViberServerContext);
	const value = context.promiseResults[key] || initial;
	return [value, (newVal) => {
		context.promises.push(new Promise(resolve => {
			context.promiseResults[key] = newVal;
			resolve('');
		}));
	}];
}
