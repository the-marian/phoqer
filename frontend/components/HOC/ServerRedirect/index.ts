import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import { IAuth, IStore } from '../../../interfaces';

type Callback = (ctx: GetServerSidePropsContext & { store: IStore }) => Promise<void> | void;

const serverRedirect = (func?: Callback, path?: string, reverse = false): Callback => async (
    ctx: GetServerSidePropsContext & { store: IStore },
): Promise<void> => {
    const token = parseCookie<IAuth>(ctx.req.headers.cookie)?.auth_token;
    const redirect = reverse ? token : !token;
    if (redirect) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', path || routes.root);
    }

    if (func) return func(ctx);
};

export default serverRedirect;
