import { IViberContext, ViberServerContext } from '@viber-common/shared/viber-server.context';
import { useContext } from 'react';
import { useUnique } from './use-unique.hook';

export function useServerQuery<T>(name: string, callback: () => Promise<T>): [T | undefined | null] {
	const key = useUnique('useServerQuery', name);
	const context: IViberContext = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

    const data = context.getPromiseResult(key)?.data;
	if ( !context.hasFinishedPromise(key)) {
		const promise = callback();
		
		context.addPromise(promise.then((data) => {
			context.updatePromiseResult(key,{
				isFinished: true,
				data
			});
		}));
    }
    return [data];
}
