import { Params } from 'next/dist/next-server/server/router';
import queryString from 'query-string';

<<<<<<< HEAD
=======
const push = (query: Params): void => {
    const value = queryString.stringify(query, { skipNull: true });
    const url = location.pathname + (value ? '?' + value : value);
    window.history.pushState({}, window.location.origin, url);
};

>>>>>>> d0a04e15059ac5becb15b02e2ee23426aae0c9ad
const useShallowRouter = (): ((query: Params) => void) => {
    return (query: Params): void => {
        const value = queryString.stringify(query, { skipNull: true });
        const url = location.pathname + (value ? '?' + value : value);
        window.history.pushState({}, window.location.origin, url);
    };
};

export default useShallowRouter;
