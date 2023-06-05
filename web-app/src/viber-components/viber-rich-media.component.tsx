import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
    buttons?: ReactNode;
}
export const ViberRichMedia = ({ buttons: buttons }: IProps): JSX.Element => {
    return (
        <Json
            json={{
                Type: 'rich_media',
                BgColor: '#FFFFFF',
            }}
        >
            {buttons ? <>,"Buttons":[{buttons}]</> : null}
        </Json>
    );
};
