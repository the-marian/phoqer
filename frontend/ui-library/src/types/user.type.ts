import { ID } from './common.type';

export interface User {
    id: ID;
    firstName: string;
    lastName: string;
    avatar: string | null;
    createdAt?: number;
}
