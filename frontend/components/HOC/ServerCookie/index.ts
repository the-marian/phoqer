import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import { IAuth, IStore } from '../../../interfaces';

type ServerProp = GetServerSidePropsContext & { store?: IStore; auth?: IAuth | null };
type Callback = (ctx: ServerProp) => Promise<void>;

const serverCookie = (func: Callback): Callback => async (ctx: ServerProp): Promise<void> => {
    (ctx as ServerProp).auth = parseCookie<IAuth | null>(ctx.req.headers.cookie);
    await func(ctx);
};

export default serverCookie;
