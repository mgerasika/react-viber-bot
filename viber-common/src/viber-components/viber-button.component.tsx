import { IViberActionArg } from '@viber-common/interfaces/viber-action-arg.interface';
import { getViberActionId } from '@viber-common/utils/get-viber-action-id.util';
import React, { useContext } from 'react';
import { Json } from './json.component';
import { ViberServerContext } from '@viber-common/shared/viber-server.context';
import { IUrlItem } from 'react-create-url';

interface ICommonProps {
    Text: string;
    Columns: number;
	Rows: number;
	actionBody:
        | (Omit<IViberActionArg, 'link'> & {
              link: IUrlItem;
          })
        | undefined;
}

interface IOtherProps extends ICommonProps {
	actionType: 'reply' | 'share-phone' | 'location-picker' |  'none' | 'payment';
}


interface IOpenUrlProps extends ICommonProps {
	actionType: 'open-url';
	href: string;
}
type IProps = IOtherProps | IOpenUrlProps;

export const LINK_AND_METADATA_SEPARATOR = '#';
export const ViberButton = ({ Columns, Rows, Text, actionBody, actionType, ...rest }: IProps): JSX.Element => {

	const context = useContext(ViberServerContext);
	context.request.tracking_data = getViberActionId({
		link: actionBody?.link || context.request.actionArg?.link || '',
		actionName: actionBody?.actionName,
		actionArgument: actionBody?.actionArgument,
	});

	if (actionType === 'open-url') {
		const props = rest as IOpenUrlProps;
		return (
		<Json
			addComa
            json={{
                Columns,
                Rows,
				Text,
				ActionType: actionType,
                ActionBody: actionBody
                    ? props.href + LINK_AND_METADATA_SEPARATOR+ getViberActionId({
                          link: actionBody?.link,
                          actionName: actionBody.actionName,
                          actionArgument: actionBody.actionArgument,
                      })
                    : props.href,
                TextSize: 'regular',
            }}
        />
    );
	}
    return (
		<Json
			addComa
            json={{
                Columns,
                Rows,
				Text,
                ActionType: actionType,
                ActionBody: actionBody
                    ? getViberActionId({
                          link: actionBody?.link,
                          actionName: actionBody.actionName,
                          actionArgument: actionBody.actionArgument,
                      })
                    : undefined,

                TextSize: 'regular',
            }}
        />
    );
};
