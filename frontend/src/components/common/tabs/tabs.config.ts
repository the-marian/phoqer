import { ITabsNum } from '../../../interfaces';

export interface ITabsItem {
    id: string;
    text: string;
    count?: string | number;
}

const temp: ITabsNum = {
    messages: 4,
    notifications: 5,
};

export const userPrivateTabs = (count: ITabsNum = temp): ITabsItem[] => [
    {
        id: 'rented-offers',
        text: 'rented_offers',
    },
    {
        id: 'my-offers',
        text: 'my_offers',
    },
    {
        id: 'chat',
        text: 'chat',
        count: count?.messages,
    },
    {
        id: 'notifications',
        text: 'notifications',
        count: count?.notifications,
    },
    {
        id: 'referral',
        text: 'invite_friends',
    },
    {
        id: 'settings',
        text: 'settings',
    },
    {
        id: 'analytics',
        text: 'analytics',
    },
];
