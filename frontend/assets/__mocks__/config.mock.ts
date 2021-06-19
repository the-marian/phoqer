import { faChartBar } from '@fortawesome/free-regular-svg-icons/faChartBar';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faFlag } from '@fortawesome/free-regular-svg-icons/faFlag';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { ICategories, IDropList, ITabs } from '../../interfaces';

export const userNavLinks: ITabs[] = [
    {
        id: 'my-profile',
        text: 'my_profile',
        link: '/profile/userId',
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

export const authCookies = 'phoqer_auth={%22loading%22:false%2C%22access_token%22:null}';

export const siteCookies =
    'phoqer_auth={%22loading%22:false%2C%22access_token%22:null};phoqer_config={%22warning%22:false%2C%22hideSearchFilters%22:true%2C%22hideTopSearchQuery%22:true%2C%22hideTopOffers%22:true}';

export const siteCookiesReverse =
    'phoqer_config={%22warning%22:false%2C%22hideSearchFilters%22:true%2C%22hideTopSearchQuery%22:true%2C%22hideTopOffers%22:true};phoqer_auth={%22loading%22:false%2C%22access_token%22:null};';

export const catList: ICategories[] = [
    {
        icon_image: 'test1',
        image: 'test1',
        slug: 'test1',
    },
    {
        icon_image: 'test2',
        image: 'test2',
        slug: 'test2',
    },
    {
        icon_image: 'test3',
        image: 'test3',
        slug: 'test3',
        sub_category: [
            {
                icon_image: 'test3.1',
                image: 'test3.1',
                slug: 'test3.1',
            },
            {
                icon_image: 'test3.2',
                image: 'test3.2',
                slug: 'test3.2',
            },
        ],
    },
];

export const dropValue: IDropList[] = [
    {
        icon_image: 'test1',
        image: 'test1',
        slug: 'test1',
    },
    {
        slug: 'test2',
        icon_image: 'test2',
        image: 'test2',
    },
    {
        slug: 'test3',
        icon_image: 'test3',
        image: 'test3',
        sub: [
            {
                icon_image: 'test3.1',
                image: 'test3.1',
                slug: 'test3.1',
            },
            {
                icon_image: 'test3.2',
                image: 'test3.2',
                slug: 'test3.2',
            },
        ],
    },
];
