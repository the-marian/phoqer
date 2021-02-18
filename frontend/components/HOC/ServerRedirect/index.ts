import { GetServerSidePropsContext } from 'next';

import routes from '../../../assets/routes';
import { IAuth, IStore } from '../../../interfaces';
import serverCookie from '../ServerCookie';

type ServerProp = GetServerSidePropsContext & { store: IStore; auth?: IAuth | null };
type Callback = (ctx: GetServerSidePropsContext & { store: IStore }) => Promise<void>;

const serverRedirect = (func?: Callback | null, path?: string | null, reverse = false): Callback =>
    serverCookie(
        async (ctx): Promise<void> => {
            const redirect = reverse ? ctx.auth?.auth_token : !ctx.auth?.auth_token;
            if (redirect) {
                ctx.res.statusCode = 302;
                ctx.res.setHeader('Location', path || routes.root);
                return;
            }

            if (func) await func(ctx as ServerProp);
        },
    );

export default serverRedirect;
