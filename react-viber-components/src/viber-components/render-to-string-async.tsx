import { IViberRequest } from '@src/interfaces/viber-request.interface';
import { ViberServerContext } from '../shared/viber-server.context';
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
    const contextValue: any = { promises: [] };
    let html;
    let renderCount = 0;
    do {
        contextValue.promises = [];
        html = ReactDOMServer.renderToString(
            <ViberServerContext.Provider value={contextValue}>
                <App request={request} />
            </ViberServerContext.Provider>,
        );
        await Promise.all(contextValue.promises);
        renderCount++;
        if (renderCount > 10) {
            throw 'Too many rerenders';
        }
        console.log('promises count ', contextValue.promises.length);
    } while (contextValue.promises.length > 0);

    const text = html2text(html);
    try {
        return { renderCount, json: JSON.parse(text), text, html };
    } catch (error: any) {
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
