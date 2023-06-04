import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";

export function useServerTimeout(name: string, callback: () => void, timeout: number): { callback: () => void } {
	const key = useUnique('useServerTimeout', name);
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

	return {
		callback: () => {
			if (!context.hasFinishedPromise(key)) {
				context.addPromise(new Promise(resolve => setTimeout(() => {
					callback();
					resolve('');
				}, timeout)));
				context.updatePromiseResult(key, {
					isFinished:true
				});
			}
		}
	}
}