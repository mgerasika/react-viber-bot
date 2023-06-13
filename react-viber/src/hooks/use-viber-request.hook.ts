import {  IViberRequest } from "@react-viber/interfaces/viber-request.interface";
import { ViberServerContext } from "@react-viber/shared/viber-server.context";
import { useContext } from "react";

export function useViberRequest(): IViberRequest {
	const context = useContext(ViberServerContext);
	return context.request;
} 

