import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import routes from '../../../assets/routes';
import { IAuth, IStore } from '../../../interfaces';

type Callback = (ctx: GetServerSidePropsContext & { store: IStore }) => Promise<void> | void;

const serverRedirect = (func?: Callback, path?: string): Callback => async (
    ctx: GetServerSidePropsContext & { store: IStore },
): Promise<void> => {
    if (!parseCookie<IAuth>(ctx.req.headers.cookie)?.auth_token) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', path || routes.root);
    }

    if (func) return func(ctx);
};

export default serverRedirect;
