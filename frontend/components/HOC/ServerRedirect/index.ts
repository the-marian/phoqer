import { GetServerSidePropsContext } from 'next';

import routes from '../../../assets/routes';
import serverCookie from '../ServerCookie';

const serverRedirect = (ctx: GetServerSidePropsContext, path?: string | null, reverse = false): boolean => {
    const auth = serverCookie(ctx);
    const redirect = reverse ? auth?.auth_token : !auth?.auth_token;
    if (redirect) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', path || routes.root);
    }

    return !!redirect;
};

export default serverRedirect;
