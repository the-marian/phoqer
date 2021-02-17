import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import { IAuth, IStore } from '../../../interfaces';

type ServerProp = GetServerSidePropsContext & { store?: IStore; auth?: IAuth | null };
type Callback = (ctx: ServerProp) => Promise<void> | void;

const serverCookie = (func: Callback | null): Callback => async (ctx: ServerProp): Promise<void> => {
    ctx.auth = parseCookie<IAuth | null>(ctx.req.headers.cookie);
    if (typeof func === 'function') return func(ctx);
};

export default serverCookie;
