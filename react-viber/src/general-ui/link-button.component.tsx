import { getViberActionId } from '@react-viber/utils/get-viber-action-id.util';
import { IViberOriginalButtonProps, ViberOriginalButton } from '../viber-components/viber-original-button.component';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';
import React from 'react';

 interface IProps extends Omit<IViberOriginalButtonProps, 'ActionBody'>{
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
