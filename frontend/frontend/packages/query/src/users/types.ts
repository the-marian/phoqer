import { ID } from '../types';

export interface User {
    id: ID;
    firstName: string;
    lastName: string;
    avatar: string | null;
    createdAt?: number;
}

export interface UserType extends User {
    date: number;
    email: string;
    accountType: string;
}
