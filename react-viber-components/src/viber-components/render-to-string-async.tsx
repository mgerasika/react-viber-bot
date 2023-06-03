import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { IViberContext, ViberServerContext } from '../shared/viber-server.context';
import { App } from '@src/viber-page/app.component';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';

export interface IRenderToStringResult {
    json?: any;
    error?: any;
    text: string;
    html: string;
    renderCount: number;
}

export const renderToStringAsync = async (request: IViberRequest): Promise<IRenderToStringResult> => {
    const contextValue: IViberContext = { promises: [],request: request, promiseResults:{}  };
    let html;
	let renderCount = 0;
	const dt1 = (new Date()).getTime();
    do {
		contextValue.promises = [];
		
        html = ReactDOMServer.renderToString(
            <ViberServerContext.Provider value={contextValue}>
                <App />
            </ViberServerContext.Provider>,
        );
        await Promise.all(contextValue.promises);
        renderCount++;
        if (renderCount > 10) {
            throw 'Too many rerenders';
        }
        console.log('promises count ', contextValue.promises.length);
	} while (contextValue.promises.length > 0);
	const dt2 = (new Date()).getTime();
	console.log(`render count=${renderCount} total time = ${dt2 - dt1}ms`);

	let text = html2text(html);
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
