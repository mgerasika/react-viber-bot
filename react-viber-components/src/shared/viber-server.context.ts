import { IViberRequest } from '@src/interfaces/viber-request.interface';
import React from 'react';
export interface IViberContext {
	promises: Promise<any>[],
	promiseResults: any;
	request: IViberRequest;
}
export const ViberServerContext = React.createContext<IViberContext>({ promises: [], promiseResults: {} as any, request:{} as IViberRequest });
