import React, { ReactNode } from 'react';
import { Json } from './json.component';

interface IProps {
	Buttons?: ReactNode;
	ButtonsGroupColumns?: 1|2|3|4|5|6,
	ButtonsGroupRows?: 1 | 2 | 3 | 4 | 5 | 6 | 7,
	BgColor?: string;
}
export const ViberRichMedia = ({ Buttons, ...rest }: IProps): JSX.Element => {
    return (
        <Json
            json={{
				Type: 'rich_media',
				...rest
            }}
        >
            {Buttons ? <>,"Buttons":[{Buttons}]</> : null}
        </Json>
    );
};
