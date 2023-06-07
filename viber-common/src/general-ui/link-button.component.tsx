import { getViberActionId } from '@viber-common/utils/get-viber-action-id.util';
import { IViberOriginalButtonProps, ViberOriginalButton } from '../viber-components/viber-original-button.component';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';
import React from 'react';

export interface IProps extends Omit<IViberOriginalButtonProps, 'ActionBody'>{
	name: string;
	link: string;
}

export const LinkButton = ({ link,  ...rest }: IProps): JSX.Element => {
	const {actionArg } = useViberRequest(); 
    return (
		<ViberOriginalButton
			{...rest}
			ActionBody={ getViberActionId({...actionArg, link} )}
        />
    );
};
