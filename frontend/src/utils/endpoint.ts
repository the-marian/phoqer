import env from './env';

const PREFIX = '/api/v2';

const endpoint = (path = ''): string => env.NEXT_PUBLIC_URL + PREFIX + path;

export default endpoint;
