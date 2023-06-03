import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
    buttons?:  ReactNode[] | ReactNode;
}
export const ViberKeyboard = ({ buttons }: IProps): JSX.Element => {
    return (
        <Json
            json={{
                Type: 'keyboard',
                DefaultHeight: false,
				
            }}
        >
			{buttons ? <>,"Buttons":[{buttons}]</> : null}
        </Json>
    );
};
