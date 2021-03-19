import { Params } from 'next/dist/next-server/server/router';
import queryString from 'query-string';

const push = (query: Params): void => {
    const value = queryString.stringify(query, { skipNull: true });
    const url = location.pathname + (value ? '?' + value : value);
    window.history.pushState({}, window.location.origin, url);
};

const useShallowRouter = (): ((query: Params) => void) => {
    return push;
};

export default useShallowRouter;
