export type LoginBody = {
    email: string;
    password: string;
};

export type SignupBody = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type AuthResponse = { token: string; expired: number };
