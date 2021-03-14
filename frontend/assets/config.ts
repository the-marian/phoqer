import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';

import { ITabs, ITabsNum } from '../interfaces';
import routes from './routes';

const config = {
    baseUrl: {
        development: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        test: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        production: (version = 'v1'): string =>
            process.browser
                ? 'http://phoqer.com/api/' + version
                : version === 'v1'
                ? 'http://backend:8000/api/' + version
                : 'http://fastapi:8001',
    },
    uploadsUrl: (version = 'v1'): string => `http://phoqer.com/api/${version}/upload/`,
    host: (lang = 'pl'): string => 'http://' + lang + '.phoqer.com/',
    img: 'http://phoqer.com',
    offers: {
        grid: {
            desktop: 4,
            tablet: 3,
            smallTablet: 2,
            mobile: 1,
        },
    },
    category: {
        grid: {
            desktop: 6,
            tablet: 4,
            smallTablet: 3,
            mobile: 2,
        },
    },
    userProfileLinks: (userId: string, T: { [key: string]: string }, count?: ITabsNum): ITabs[] => [
        {
            text: T.my_profile,
            link: routes.profile.public(userId),
            icon: faUser,
        },
        {
            text: T.my_offers,
            link: routes.profile.private.my_offers(userId),
            icon: faBullhorn,
        },
        {
            text: T.messages,
            link: routes.profile.private.messages(userId),
            icon: faEnvelope,
            count: count?.messages,
            blank: true,
        },
        {
            text: T.reviews,
            link: routes.profile.private.reviews(userId),
            icon: faCommentAlt,
            count: count?.reviews,
        },
        {
            text: T.invite_friends,
            link: routes.profile.private.referral(userId),
            icon: faUserPlus,
        },
        {
            text: T.settings,
            link: routes.profile.private.settings(userId),
            icon: faSlidersH,
        },
    ],
};

export default config;
