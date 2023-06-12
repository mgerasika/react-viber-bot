import { IViberContext, ViberServerContext } from '@viber-common/shared/viber-server.context';
import { useContext } from 'react';
import { useUnique } from './use-unique.hook';

export function useServerMutation<T>(name: string, callback: () => Promise<T>): { mutate: () => void, data: T | undefined } {
	const key = useUnique('useServerMutation', name);
	const context: IViberContext = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

    const data = context.getPromiseResult(key)?.data;
	
	return {
		mutate: () => {
			if (!context.hasFinishedPromise(key)) {
				context.addPromise(callback().then((data) => {
					context.updatePromiseResult(key, {
						isFinished: true,
						data: data
					});
				}));
			}

		},
		data
	};
}
