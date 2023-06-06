import { ViberServerContext } from "@viber-common/shared/viber-server.context";
import { useContext } from "react";


export function useUnique(category: string, name: string): string {
	const context = useContext(ViberServerContext);
	const res = `${category}-${name}`;
	if (context.getPromiseResult(res)?.isInitialized ) {
		throw 'Key already used ' + res;
	}
	return res;
}