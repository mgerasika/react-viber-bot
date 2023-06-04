import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IPromiseResultInfo, IViberContext, ViberServerContext } from '../shared/viber-server.context';
import { App } from '@src/viber-page/app.component';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { IViberMessage } from '@src/interfaces/viber-message.interface';
import { IViberResponse } from '@src/interfaces/viber-response.interface';
import { EViberMessageType } from '@src/enums/viber-message-type.enum';

export interface IRenderToStringResult {
    json?: any;
    error?: any;
    text: string;
    html: string;
    renderCount: number;
}

export const renderToStringAsync = async (request: IViberRequest): Promise<IRenderToStringResult> => {
	let promises: Promise<any>[] = [];
	const promiseResults: Record<string, IPromiseResultInfo | undefined> = {};
	const contextValue: IViberContext = {
		request,
		addPromise: (promise) => {
			promises.push(promise);
		},
		hasFinishedPromise: (key) => {
			return  !!promiseResults[key]?.isFinished;
		},
		updatePromiseResult: (key, result) => {
			if (result.isInitialized && promiseResults[key]?.isInitialized ) {
				throw 'Promise already isInitialized ' + key;
			}
			promiseResults[key] = {
				...(promiseResults[key] || {}) as IPromiseResultInfo,
				...result
			};
		},
		getPromiseResult: (key) => promiseResults[key]
	};
	
    let html;
	let renderCount = 0;
	const dt1 = (new Date()).getTime();
	do {
		//clear previous render 
		promises = [];

		Object.keys(promiseResults).forEach(key => {
			if (promiseResults[key]) {
				(promiseResults[key] as any).isInitialized = false;
			}
		});

		//render to string
        html = ReactDOMServer.renderToString(
            <ViberServerContext.Provider value={contextValue}>
                <App />
            </ViberServerContext.Provider>,
        );
        await Promise.all(promises);
        renderCount++;
        if (renderCount > 10) {
            throw 'Too many rerenders';
        }
        console.log('promises count ', promises.length);
	} while (promises.length > 0);
	const dt2 = (new Date()).getTime();
	console.log(`render count=${renderCount} total time = ${dt2 - dt1}ms`);

	let text =   html2text(html);
	text = text.replaceAll(/,,/g, ',');	
	text = text.replaceAll(/,,/g, ',');	
	text = text.replaceAll(',}', '}');
	text = text.replaceAll(',]', ']');
    try {
        return { renderCount, json: JSON.parse(text), text, html };
	} catch (error: any) {
		console.log('error parse json', text);
        return { renderCount, error: error?.message || '', text, html };
    }
};

export const html2text = (html: string): string => {
    return html
        .replace(/<(?:.|\n)*?>/gm, '')
        .replace(/&lt;/gm, '<')
        .replace(/&gt;/gm, '>')
        .replace(/&#x27;/gm, "'")
        .replace(/&quot;/gm, '"');
};
