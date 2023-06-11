import { EMPTY_URL_ITEM, IUrlItem, createUrls } from 'react-create-url';

interface IAppLink {
    index: IUrlItem;

	messages: IUrlItem;
	buttons: IUrlItem;
	input: IUrlItem;
	rich_confirm: IUrlItem;
	exit: IUrlItem;
}

export const LINKS = createUrls<IAppLink>({
    index: EMPTY_URL_ITEM,

	messages: EMPTY_URL_ITEM,
	buttons: EMPTY_URL_ITEM,
	input: EMPTY_URL_ITEM,
	rich_confirm: EMPTY_URL_ITEM,
	exit: EMPTY_URL_ITEM,
});
