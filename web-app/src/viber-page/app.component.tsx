import { useRequest } from '@viber-common/hooks/use-request.hook';
import { DocumentsPage } from './documents-page.component';
import { ExitPage } from './exit-page.component';
import { IndexPage } from './index-page.component';
import { NewsPage } from './news-page.component';
import { NotFoundPage } from './not-found-page.component';
import { WelcomePage } from './welcome-page.component';
import { LINKS } from '@src/constants/links.constant';
import { IViberConversationStartedRequest, IViberBodyRequest } from '@viber-common/interfaces/viber-request.interface';


export const App = (): JSX.Element => {
	const request = useRequest();
	const  { actionArg } = request;
   
    switch (actionArg?.link) {
        case LINKS.welcome.toString():
            return <WelcomePage request={request as IViberConversationStartedRequest} />;

        case LINKS.index.toString():
            return <IndexPage request={request as IViberBodyRequest} />;

        case LINKS.exit.toString():
            return <ExitPage request={request as IViberBodyRequest} />;

        case LINKS.news.toString():
            return <NewsPage />;

        case LINKS.documents.toString():
            return <DocumentsPage request={request as IViberBodyRequest} />;

        default:
            return <NotFoundPage request={request as IViberBodyRequest} />;
    }
};
