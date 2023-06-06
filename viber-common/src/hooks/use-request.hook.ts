import { IViberRequest } from "@viber-common/interfaces/viber-request.interface";
import { ViberServerContext } from "@viber-common/shared/viber-server.context";
import { useContext } from "react";

export function useRequest(): IViberRequest {
	const context = useContext(ViberServerContext);
	return context.request;
}