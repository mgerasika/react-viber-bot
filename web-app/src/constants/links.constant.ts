import { EMPTY_URL_ITEM, IUrlItem, createUrls } from 'react-create-url';

interface IAppLink {
    welcome: IUrlItem;
    index: IUrlItem;

    news: IUrlItem;
    documents: IUrlItem;
	exit: IUrlItem;
}

export const LINKS = createUrls<IAppLink>({
    index: EMPTY_URL_ITEM,
    welcome: EMPTY_URL_ITEM,

    news: EMPTY_URL_ITEM,
    documents: EMPTY_URL_ITEM,
	exit: EMPTY_URL_ITEM,
});
