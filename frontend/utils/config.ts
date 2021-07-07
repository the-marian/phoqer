import { faChartBar } from '@fortawesome/free-regular-svg-icons/faChartBar';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { ITabs, ITabsNum, Themes } from '../interfaces';
import routes from './routes';

const generateBaseNavLink = (count?: ITabsNum): ITabs[] => [
    {
        id: 'my-offers',
        text: 'my_offers',
        link: routes.profile.private.my_offers(),
        icon: faBullseye,
    },
    {
        id: 'chat',
        text: 'chat',
        link: routes.profile.private.chat(),
        icon: faEnvelope,
        count: count?.messages,
    },
    {
        id: 'reviews',
        text: 'reviews',
        link: routes.profile.private.reviews,
        icon: faCommentAlt,
        count: count?.reviews,
    },
    {
        id: 'referral',
        text: 'invite_friends',
        link: routes.profile.private.referral,
        icon: faPlusSquare,
    },
    {
        id: 'settings',
        text: 'settings',
        link: routes.profile.private.settings(),
        icon: faSlidersH,
    },
    {
        id: 'analytics',
        text: 'analytics',
        link: routes.profile.private.analytics(),
        icon: faChartBar,
    },
];

const config = {
    baseUrl: {
        development: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        test: (version = 'v1'): string => 'http://phoqer.com/api/' + version,
        production: (version = 'v1'): string => (process.browser ? 'http://phoqer.com/api/' + version : 'http://backend:8001'),
    },
    socketUrl: (version = 'v1'): string => 'ws://phoqer.com/api/' + version,
    uploadsUrl: (version = 'v2'): string => `http://phoqer.com/api/${version}/upload`,
    host: (lang = 'pl'): string => `http://phoqer.com${lang === 'pl' ? '' : '/' + lang}`,
    img: 'http://phoqer.com',
    themes: [
        'blue',
        'green',
        'aqua',
        'violet',
        'black-blue',
        'black-violet',
        'black-orange',
        'black-aqua',
        'black-green',
    ] as Themes[],
    googleApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY || 'AIzaSyDAxCmU098YF_pqjtUzqTPwGF7JaH5ytyI',
    userProfileLinks: (count?: ITabsNum): ITabs[] => generateBaseNavLink(count),
    userNavLinks: (userId: string, count?: ITabsNum): ITabs[] => [
        {
            id: 'my-profile',
            text: 'my_profile',
            link: routes.profile.public(userId),
            icon: faUserCircle,
        },
        {
            id: 'personal-area',
            text: 'personal_area',
            link: routes.profile.private.personal_area,
            icon: faFlag,
        },
        ...generateBaseNavLink(count),
    ],
};

export default config;
