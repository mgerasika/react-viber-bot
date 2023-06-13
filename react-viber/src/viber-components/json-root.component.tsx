import React, { ReactNode } from 'react';

interface IProps {
    isArray: boolean;
	children: ReactNode;
	addComa?: boolean;
}
export const JsonRoot = ({ addComa, isArray, children }: IProps): JSX.Element => {
    return isArray ? (
        <>
            {'['}
            {children}
            {']'}
        </>
    ) : (
        <>
            {'{'}
            {children}
				{'}'}
				{addComa && ','}
        </>
    );
};
