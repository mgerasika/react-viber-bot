import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
    Buttons?:  ReactNode[] | ReactNode;
}
export const ViberKeyboard = ({ Buttons: buttons }: IProps): JSX.Element => {
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
