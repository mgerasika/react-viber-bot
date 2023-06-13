import { getViberActionId } from '@react-viber/utils/get-viber-action-id.util';
import { IViberOriginalButtonProps, ViberOriginalButton } from '../viber-components/viber-original-button.component';
import { useServerAction } from '@react-viber/hooks/use-server-action-body.hook';
import { useViberRequest } from '@react-viber/hooks/use-viber-request.hook';

export interface IProps extends Omit<IViberOriginalButtonProps, 'ActionBody'>{
	name: string;
	onClick?: () => void;
}

export const LINK_AND_METADATA_SEPARATOR = '#';
export const Button = ({name, onClick,  ...rest }: IProps): JSX.Element => {
	const handleClick = onClick ? useServerAction(`viber-button-${name}`, onClick) : undefined;
	const {actionArg } = useViberRequest(); 
	
    return (
		<ViberOriginalButton
			{...rest}
			ActionBody={handleClick ? getViberActionId(handleClick)  : getViberActionId(actionArg )}
        />
    );
};
