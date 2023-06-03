import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";

export function useServerTimeout(key: string, callback: () => void, timeout: number): { callback: () => void } {
	const context = useContext(ViberServerContext);

	return {
		callback: () => {
			if (!Object.keys(context.promiseResults).includes(key)) {
				context.promises.push(new Promise(resolve => setTimeout(() => {
					callback();
					resolve('');
				}, timeout)));
				context.promiseResults[key] = true;
			}
		}
	}
}