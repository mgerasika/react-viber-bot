import React, { ReactNode } from 'react';
import { JsonRoot } from './json-root.component';

interface IProps {
    json: any;
	addComa?: boolean;
	children?: ReactNode;
}
export const Json = ({ json, children, addComa }: IProps): JSX.Element => {
	let jsonStr = JSON.stringify(json);
	jsonStr = jsonStr.slice(1, jsonStr.length - 1);
	return (
        <JsonRoot isArray={Array.isArray(json)} addComa={addComa}>
			{jsonStr}
			{children}
		</JsonRoot>
    );
};
