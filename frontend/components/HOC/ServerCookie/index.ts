import { GetServerSidePropsContext } from 'next';

import { parseCookie } from '../../../assets/helpers';
import { IAuth } from '../../../interfaces';

const serverCookie = (ctx: GetServerSidePropsContext): IAuth | null => parseCookie<IAuth | null>(ctx.req.headers.cookie);

export default serverCookie;
