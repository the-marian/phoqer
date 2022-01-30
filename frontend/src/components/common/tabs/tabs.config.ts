import { ChatTypeEnum, ITabsNum } from '../../../interfaces';

export interface ITabsItem {
    id: string;
    text: string;
    count?: string | number;
    sub?: ITabsItem[];
}

const temp: ITabsNum = {
    messages: 4,
    notifications: 5,
};

export const userPrivateTabs = (count: ITabsNum = temp): ITabsItem[] => [
    {
        id: 'my-offers',
        text: 'my_offers',
    },
    {
        id: 'chat',
        text: 'chat',
        count: count?.messages,
        sub: [
            {
                id: ChatTypeEnum.AUTHOR,
                text: ChatTypeEnum.AUTHOR,
                count: count?.messages,
            },
            {
                id: ChatTypeEnum.CLIENT,
                text: ChatTypeEnum.CLIENT,
                count: count?.messages,
            },
        ],
    },
    {
        id: 'notifications',
        text: 'notifications',
        count: count?.notifications,
    },
    {
        id: 'settings',
        text: 'settings',
    },
];
