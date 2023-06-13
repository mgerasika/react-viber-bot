import { IViberRequest } from '@react-viber/interfaces/viber-request.interface';
import React from 'react';
export interface IPromiseResultInfo {
	isFinished: boolean
	isInitialized:boolean
	data?: any;
}
export interface IViberContext {
	request: IViberRequest;
	hasFinishedPromise: (key: string) => boolean;
	addPromise: (promise: Promise<any>) => void;
	getPromiseResult: (key:string) => IPromiseResultInfo | undefined,
	updatePromiseResult: (key:string, result: Partial<IPromiseResultInfo>) => void;
}
export const ViberServerContext = React.createContext<IViberContext>(
	{
		getPromiseResult: () => undefined,
		hasFinishedPromise: () => false,
		addPromise: () => null,
		updatePromiseResult: () => null,
		request: {} as unknown as IViberRequest

	});
