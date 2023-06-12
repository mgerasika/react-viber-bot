import { IViberContext, ViberServerContext } from '@viber-common/shared/viber-server.context';
import { useContext } from 'react';
import { useUnique } from './use-unique.hook';

interface IOptions {
	enabled?: boolean;
}
export function useServerQuery<T>(name: string, callback: () => Promise<T>, options: IOptions = { enabled: true }): { data: T | undefined | null } {
	const key = useUnique('useServerQuery', name);
	const context: IViberContext = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

    const data = context.getPromiseResult(key)?.data;
	if ( !context.hasFinishedPromise(key)&& options?.enabled) {
		const promise = callback();
		
		context.addPromise(promise.then((data) => {
			context.updatePromiseResult(key,{
				isFinished: true,
				data
			});
		}));
    }
	return { data: data };
}
