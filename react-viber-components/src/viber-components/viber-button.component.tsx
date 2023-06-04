import { IViberActionArg } from '@src/interfaces/viber-action-arg.interface';
import { getViberActionId } from '@src/utils/get-viber-action-id.util';
import { ILinkItem } from '@src/utils/make-links.util';
import React from 'react';
import { Json } from './json.component';

interface ICommonProps {
    Text: string;
    Columns: number;
	Rows: number;
	onClick?:
        | (Omit<IViberActionArg, 'link'> & {
              link: ILinkItem;
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
export const ViberButton = ({ Columns, Rows, Text, onClick, actionType, ...rest }: IProps): JSX.Element => {
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
                ActionBody: onClick
                    ? props.href + LINK_AND_METADATA_SEPARATOR+ getViberActionId({
                          link: onClick?.link,
                          actionName: onClick.actionName,
                          actionArgument: onClick.actionArgument,
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
                ActionBody: onClick
                    ? getViberActionId({
                          link: onClick?.link,
                          actionName: onClick.actionName,
                          actionArgument: onClick.actionArgument,
                      })
                    : undefined,

                TextSize: 'regular',
            }}
        />
    );
};
