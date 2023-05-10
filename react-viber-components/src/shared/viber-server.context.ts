import React from 'react';
interface IViberContext {
	promises: [],
	promiseResults: any;
}
export const ViberServerContext = React.createContext<IViberContext>({ promises: [], promiseResults: {} as any });
