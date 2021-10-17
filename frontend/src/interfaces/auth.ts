export interface ILogin {
    username: string;
    password: string;
}

export interface ISignup {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
}

export interface IAuth {
    loading: boolean;
    access_token: string | null;
}
