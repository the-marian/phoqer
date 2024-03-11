import { ID, User } from 'phoqer';

export interface Message {
    id: ID;
    time: Date | number | string;
    content: string;
    user: User;
}
