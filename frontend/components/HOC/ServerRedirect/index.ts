import { GetServerSidePropsContext } from 'next';

import routes from '../../../assets/routes';
import { IAuth, IStore } from '../../../interfaces';
import serverCookie from '../ServerCookie';

type Callback = (ctx: GetServerSidePropsContext & { store: IStore }) => Promise<void> | void;

const serverRedirect = (func?: Callback | null, path?: string | null, reverse = false): Callback =>
    serverCookie(
        async (ctx: GetServerSidePropsContext & { store: IStore; auth: IAuth }): Promise<void> => {
            const redirect = reverse ? ctx.auth?.auth_token : !ctx.auth?.auth_token;
            if (redirect) {
                ctx.res.statusCode = 302;
                ctx.res.setHeader('Location', path || routes.root);
            }

            if (func) return func(ctx);
        },
    );

export default serverRedirect;