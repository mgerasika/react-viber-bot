import { IViberContext, ViberServerContext } from '@src/shared/viber-server.context';
import { useContext } from 'react';

export function useServerMutation<T>(key: string, callback: () => Promise<T>): { mutate: () => void, data: T | undefined} {
    const context: IViberContext = useContext(ViberServerContext);
    const data = context.promiseResults[key];
	
	return {
		mutate: () => {
			if (context.promises && !Object.keys(context.promiseResults).includes(key)) {
				const promiseRes = callback().then((data) => {
					context.promiseResults[key] = data;
				});
				context.promises.push(promiseRes);
			}

		},
		data
	};
}
