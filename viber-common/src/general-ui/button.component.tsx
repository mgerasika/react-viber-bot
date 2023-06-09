import { IViberActionArg } from '@viber-common/interfaces/viber-action-arg.interface';
import { getViberActionId } from '@viber-common/utils/get-viber-action-id.util';
import { IViberOriginalButtonProps, ViberOriginalButton } from '../viber-components/viber-original-button.component';
import { useServerActionBody } from '@viber-common/hooks/use-server-action-body.hook';
import { useViberRequest } from '@viber-common/hooks/use-viber-request.hook';

export interface IProps extends Omit<IViberOriginalButtonProps, 'ActionBody'>{
	name: string;
	onClick?: () => void;
}

export const LINK_AND_METADATA_SEPARATOR = '#';
export const Button = ({name, onClick,  ...rest }: IProps): JSX.Element => {
	const handleClick = onClick ? useServerActionBody(`viber-button-${name}`, onClick) : undefined;
	const {actionArg } = useViberRequest(); 
	
    return (
		<ViberOriginalButton
			{...rest}
			ActionBody={handleClick ? getViberActionId(handleClick)  : getViberActionId(actionArg )}
        />
    );
};