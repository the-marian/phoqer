import { faChartBar } from '@fortawesome/free-regular-svg-icons/faChartBar';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faUser } from '@fortawesome/free-regular-svg-icons/faUser';
import { faBullhorn } from '@fortawesome/free-solid-svg-icons/faBullhorn';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons/faUserPlus';

import { ITabs, ITabsNum, Themes } from '../interfaces';
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
    host: (lang = 'pl'): string => `http://phoqer.com${lang === 'pl' ? '' : '/' + lang}`,
    img: 'http://phoqer.com',
    themes: ['blue', 'green', 'black-blue', 'black-violet'] as Themes[],
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
    userNavLinks: (trans: (v: string) => string, userId: string, count?: ITabsNum): ITabs[] => [
        {
            id: 'my-profile',
            text: trans('my_profile'),
            link: routes.profile.public(userId),
            icon: faUser,
        },
        {
            id: 'my-offers',
            text: trans('my_offers'),
            link: routes.profile.private.my_offers(),
            icon: faBullhorn,
        },
        {
            id: 'messages',
            text: trans('messages'),
            link: routes.profile.private.messages(),
            icon: faEnvelope,
            count: count?.messages,
        },
        {
            id: 'reviews',
            text: trans('reviews'),
            link: routes.profile.private.reviews,
            icon: faCommentAlt,
            count: count?.reviews,
        },
        {
            id: 'referral',
            text: trans('invite_friends'),
            link: routes.profile.private.referral,
            icon: faUserPlus,
        },
        {
            id: 'settings',
            text: trans('settings'),
            link: routes.profile.private.settings(),
            icon: faSlidersH,
        },
        {
            id: 'analytics',
            text: trans('analytics'),
            link: routes.profile.private.analytics(),
            icon: faChartBar,
        },
    ],
    userProfileLinks: (trans: (v: string) => string, count?: ITabsNum): ITabs[] => [
        {
            id: 'my-offers',
            text: trans('my_offers'),
            link: routes.profile.private.my_offers(),
            icon: faBullhorn,
        },
        {
            id: 'messages',
            text: trans('messages'),
            link: routes.profile.private.messages(),
            icon: faEnvelope,
            count: count?.messages,
        },
        {
            id: 'reviews',
            text: trans('reviews'),
            link: routes.profile.private.reviews,
            icon: faCommentAlt,
            count: count?.reviews,
        },
        {
            id: 'referral',
            text: trans('invite_friends'),
            link: routes.profile.private.referral,
            icon: faUserPlus,
        },
        {
            id: 'settings',
            text: trans('settings'),
            link: routes.profile.private.settings(),
            icon: faSlidersH,
        },
        {
            id: 'analytics',
            text: trans('analytics'),
            link: routes.profile.private.analytics(),
            icon: faChartBar,
        },
    ],
};

export default config;
