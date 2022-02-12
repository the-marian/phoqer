import { faCaretSquareLeft } from '@fortawesome/free-regular-svg-icons/faCaretSquareLeft';
import { faCommentAlt } from '@fortawesome/free-regular-svg-icons/faCommentAlt';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons/faEnvelope';
import { faSlidersH } from '@fortawesome/free-solid-svg-icons/faSlidersH';

import { ChatTypeEnum, ITabs, ITabsNum } from '../../../interfaces';
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
        link: routes.chat.list(),
        icon: faEnvelope,
        count: count?.messages,
        sub: [
            {
                id: ChatTypeEnum.AUTHOR,
                text: ChatTypeEnum.AUTHOR,
                link: routes.chat.list(ChatTypeEnum.AUTHOR),
                count: count?.messages,
            },
            {
                id: ChatTypeEnum.CLIENT,
                text: ChatTypeEnum.CLIENT,
                link: routes.chat.list(ChatTypeEnum.CLIENT),
                count: count?.messages,
            },
        ],
    },
    {
        id: 'notifications',
        text: 'notifications',
        link: routes.notifications,
        icon: faCommentAlt,
        count: count?.notifications,
    },
    {
        id: 'settings',
        text: 'settings',
        link: routes.settings(),
        icon: faSlidersH,
    },
];
