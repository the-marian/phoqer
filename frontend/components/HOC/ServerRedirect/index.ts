import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import router from '../../../assets/router';
import { IStore } from '../../../interfaces';

type Callback = (ctx: GetServerSidePropsContext & { store: IStore }) => Promise<void> | void;

const serverRedirect = (func?: Callback, path?: string): Callback => async (
    ctx: GetServerSidePropsContext & { store: IStore },
): Promise<void> => {
    if (!parseCookie(ctx.req.headers.cookie)?.token) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', path || router.root);
    }

    if (func) return func(ctx);
};

export default serverRedirect;
