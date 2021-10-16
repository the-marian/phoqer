// get server side cookies in next.js getServerSideProps function
import cookie from 'cookie';
import { GetServerSidePropsContext } from 'next';

import { IAuth } from '../../interfaces';
import routes from '../routes';

interface IServerCookie {
    req: { headers: { cookie: string } };
}

export const parseCookie = <T>(value = '', key = 'phoqer_auth', parsed = false): T | null => {
    try {
        return parsed ? cookie.parse(value)[key] || null : JSON.parse(cookie.parse(value)[key]);
    } catch (error) {
        return null;
    }
};

export const serverCookie = (ctx: GetServerSidePropsContext | IServerCookie): IAuth | null =>
    parseCookie<IAuth | null>(ctx.req.headers.cookie);

// redirect user in next.js getServerSideProps function
export const serverRedirect = (ctx: GetServerSidePropsContext, path?: string | null, reverse = false): boolean => {
    const auth = serverCookie(ctx);
    const redirect = reverse ? auth?.access_token : !auth?.access_token;
    if (redirect) {
        ctx.res.statusCode = 302;
        ctx.res.setHeader('Location', path || routes.root);
    }
    return !!redirect;
};
