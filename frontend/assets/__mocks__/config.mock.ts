import { faChartBar } from '@fortawesome/free-regular-svg-icons/faChartBar';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { ITabs } from '../../interfaces';
import routes from '../routes';

export const userNavLinks: ITabs[] = [
    {
        id: 'my-profile',
        text: 'my_profile',
        link: '/profile/public/userId',
        icon: faUserCircle,
    },
    {
        id: 'personal-area',
        text: 'personal_area',
        link: '/profile/private',
        icon: faFlag,
    },
    {
        id: 'my-offers',
        text: 'my_offers',
        link: '/profile/private/my-offers/all',
        icon: faBullseye,
    },
    {
        id: 'messages',
        text: 'messages',
        link: '/profile/private/messages/',
        icon: faEnvelope,
        count: 0,
    },
    {
        id: 'reviews',
        text: 'reviews',
        link: '/profile/private/reviews',
        icon: faCommentAlt,
        count: 0,
    },
    {
        id: 'referral',
        text: 'invite_friends',
        link: '/profile/private/referral',
        icon: faPlusSquare,
    },
    {
        id: 'settings',
        text: 'settings',
        link: '/profile/private/settings/general',
        icon: faSlidersH,
    },
    {
        id: 'analytics',
        text: 'analytics',
        link: '/profile/private/analytics',
        icon: faChartBar,
    },
];

export const userProfileLinks: ITabs[] = [
    {
        id: 'my-offers',
        text: 'my_offers',
        link: '/profile/private/my-offers/all',
        icon: faBullseye,
    },
    {
        id: 'messages',
        text: 'messages',
        link: '/profile/private/messages/',
        icon: faEnvelope,
        count: 0,
    },
    {
        id: 'reviews',
        text: 'reviews',
        link: '/profile/private/reviews',
        icon: faCommentAlt,
        count: 0,
    },
    {
        id: 'referral',
        text: 'invite_friends',
        link: '/profile/private/referral',
        icon: faPlusSquare,
    },
    {
        id: 'settings',
        text: 'settings',
        link: '/profile/private/settings/general',
        icon: faSlidersH,
    },
    {
        id: 'analytics',
        text: 'analytics',
        link: '/profile/private/analytics',
        icon: faChartBar,
    },
];
