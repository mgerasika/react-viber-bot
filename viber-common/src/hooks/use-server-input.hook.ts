import { ViberServerContext } from "@viber-common/shared/viber-server.context";
import { useContext } from "react";
import { useUnique } from "./use-unique.hook";
import { isJsonString } from "@viber-common/utils/is-json-string.utils";

export function useServerInput( callback: (text:string) => void): void {
	const key = useUnique('useServerInput','unique');
	const context = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

	if (!context.hasFinishedPromise(key)) {
		const msg = context.request.message_request?.message.text ;
		// TODO temporary solution - user can't enter json
		if (msg && !isJsonString(msg)) {
			callback(msg);
			context.updatePromiseResult(key, {
				isFinished: true
			});
		}
	}
}