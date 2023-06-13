import { IUrlItem } from 'react-create-url';
import { IViberActionArg } from '../interfaces/viber-action-arg.interface';

interface IProps<T> {
    link: IUrlItem;
    actionName?: keyof T;
    actionArgument?: string;
}

export function getViberActionId<T>({ link, actionName, actionArgument }: IProps<T>): string {
    const data: IViberActionArg = {
        link: link.toString(),
        actionName: actionName ? actionName.toString() : undefined,
        actionArgument,
    };
    return JSON.stringify(data);
}
