import { faChartBar } from '@fortawesome/free-regular-svg-icons/faChartBar';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons/faPlusSquare';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons/faUserCircle';
import { faBullseye } from '@fortawesome/free-solid-svg-icons/faBullseye';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { ITabs, ITabsNum } from '../../../interfaces';
import routes from '../../../utils/routes';

interface IParams {
    userId?: string | number;
    count?: ITabsNum;
}

const temp: ITabsNum = {
    messages: 4,
    reviews: 5,
};

export const getBaseNavList = ({ userId, count = temp }: IParams): ITabs[] => {
    const tabs = [
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
            link: routes.profile.private.analytics,
            icon: faChartBar,
        },
    ];

    if (userId) {
        return [
            {
                id: 'my-profile',
                text: 'my_profile',
                link: routes.profile.public(userId),
                icon: faUserCircle,
            },
            ...tabs,
        ];
    }

    return tabs;
};
