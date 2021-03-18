import { Params } from 'next/dist/next-server/server/router';
import queryString from 'query-string';

const push = (pathname: string, query: Params): void => {
    window.history.pushState(
        {},
        window.location.origin,
        pathname +
            '?' +
            queryString.stringify(query, {
                skipNull: true,
            }),
    );
};

const useShallowRouter = (): ((pathname: string, query: Params) => void) => {
    return push;
};

export default useShallowRouter;
