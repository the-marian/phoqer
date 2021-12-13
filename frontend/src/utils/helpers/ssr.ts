// get server side cookies in next.js getServerSideProps function
import cookie from 'cookie';

import { PHOQER_AUTH } from '../../constant/cookie.constant';

export const parseCookie = <T>(value = '', key = PHOQER_AUTH, parsed = false): T | null => {
    try {
        return parsed ? cookie.parse(value)[key] || null : JSON.parse(cookie.parse(value)[key]);
    } catch (error) {
        return null;
    }
};
