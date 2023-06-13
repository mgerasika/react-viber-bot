import { IViberContext, ViberServerContext } from '@react-viber/shared/viber-server.context';
import { useContext } from 'react';
import { useUnique } from './use-unique.hook';

export function useServerEffect(name: string, callback: () => void, dependency: any[]): void {
	// TODO fix dependency logic
	const key = useUnique('useServerEffect', name + dependency.join());
	const context: IViberContext = useContext(ViberServerContext);
	context.updatePromiseResult(key, {
		isInitialized: true
	});

    const data = context.getPromiseResult(key)?.data;
	if ( !context.hasFinishedPromise(key)) {
		callback();

		context.updatePromiseResult(key,{
			isFinished: true,
			data
		});
    }
}
