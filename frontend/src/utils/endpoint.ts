const prefix = '/api/v2';

const endpointsMap = {
    development() {
        return {
            ssr: (path = ''): string => 'http://dev.phoqer.com' + prefix + path,
            browser: (path = ''): string => 'http://dev.phoqer.com' + prefix + path,
        };
    },

    production() {
        return {
            ssr: (path = ''): string => 'http://backend:8001' + path,
            browser: (path = ''): string => prefix + path,
        };
    },

    test() {
        return this.development();
    },
};

endpointsMap.test = endpointsMap.development;

const endpoint =
    typeof window !== 'undefined' ? endpointsMap[process.env.NODE_ENV]().browser : endpointsMap[process.env.NODE_ENV]().ssr;

// for debug
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
window.endpoint = endpoint;

export default endpoint;
