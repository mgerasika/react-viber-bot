import { IViberRequest } from "@src/interfaces/viber-request.interface";
import { ViberServerContext } from "@src/shared/viber-server.context";
import { useContext } from "react";

export function useRequest(): IViberRequest {
	const context = useContext(ViberServerContext);
	return context.request;
}