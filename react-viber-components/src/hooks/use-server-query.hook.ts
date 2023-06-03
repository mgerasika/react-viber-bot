import { IViberContext, ViberServerContext } from '@src/shared/viber-server.context';
import { useContext } from 'react';

export function useServerQuery<T>( key: string, callback: () => Promise<T>): [T | undefined | null] {
    const context: IViberContext = useContext(ViberServerContext);
    const data = context.promiseResults[key];
	if (context.promises && !Object.keys(context.promiseResults).includes(key)) {
		const promise = callback();
		const promiseRes = promise.then((data) => {
			context.promiseResults[key] = data;
		});
		context.promises.push(promiseRes);
    }
    return [data];
}
