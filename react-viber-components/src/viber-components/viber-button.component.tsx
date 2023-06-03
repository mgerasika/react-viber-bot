import { IViberActionArg } from '@src/interfaces/viber-action-arg.interface';
import { getViberActionId } from '@src/utils/get-viber-action-id.util';
import { ILinkItem } from '@src/utils/make-links.util';
import React from 'react';
import { Json } from './json.component';

interface IProps {
    onClick:
        | (Omit<IViberActionArg, 'link'> & {
              link: ILinkItem;
          })
        | undefined;

    Text: string;
    Columns: number;
    ActionType?: 'reply' | 'share-phone' | 'location-picker' | 'open-url' | 'none' | 'payment';
    Rows: number;
}
export const ViberButton = ({ onClick, Columns, Rows, Text, ActionType = 'reply' }: IProps): JSX.Element => {
    return (
		<Json
			addComa
            json={{
                Columns,
                Rows,
                Text,
                ActionType,
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
