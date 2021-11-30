import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons/faCaretSquareLeft';
import { faChartBar } from '@fortawesome/free-regular-svg-icons/faChartBar';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { ITabs, ITabsNum } from '../../../interfaces';
import routes from '../../../utils/routes';

const temp: ITabsNum = {
    messages: 4,
    notifications: 5,
};

export const getBaseNavList = (count: ITabsNum = temp): ITabs[] => [
    {
        id: 'my-offers',
        text: 'my_offers',
        link: routes.my_offers(),
        icon: faCaretSquareLeft,
    },
    {
        id: 'chat',
        text: 'chat',
        link: routes.chat.item(),
        icon: faEnvelope,
        count: count?.messages,
    },
    {
        id: 'notifications',
        text: 'notifications',
        link: routes.notifications,
        icon: faCommentAlt,
        count: count?.notifications,
    },
    {
        id: 'referral',
        text: 'invite_friends',
        link: routes.referral,
        icon: faPlusSquare,
    },
    {
        id: 'settings',
        text: 'settings',
        link: routes.settings(),
        icon: faSlidersH,
    },
    {
        id: 'analytics',
        text: 'analytics',
        link: routes.analytics,
        icon: faChartBar,
    },
];
