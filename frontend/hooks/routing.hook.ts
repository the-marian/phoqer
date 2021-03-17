import { Params } from 'next/dist/next-server/server/router';
import queryString from 'query-string';

const push = (query: Params): void => {
    window.history.pushState(
        {},
        window.location.origin,
        window.location.pathname +
            '?' +
            queryString.stringify(query, {
                skipNull: true,
            }),
    );
};

const useShallowRouter = (): ((query: Params) => void) => {
    return push;
};

export default useShallowRouter;
