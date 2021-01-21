import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import { IAuth, IStore } from '../../../interfaces';

type Callback = (ctx: GetServerSidePropsContext & { store: IStore; auth: IAuth }) => Promise<void> | void;

const serverCookie = (func: Callback): Callback => async (
    ctx: GetServerSidePropsContext & { store: IStore; auth: IAuth },
): Promise<void> => {
    ctx.auth = parseCookie<IAuth>(ctx.req.headers.cookie);
    if (typeof func === 'function') return func(ctx);
};

export default serverCookie;
