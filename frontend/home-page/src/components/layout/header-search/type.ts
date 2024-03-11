export enum TabsEnum {
    General = 'general',
    Offers = 'offers',
    Categories = 'categories',
    Users = 'users',
}

export interface TabType {
    id: TabsEnum;
    title: string;
}
