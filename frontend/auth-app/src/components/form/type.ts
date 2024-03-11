export interface ResetType {
    email: string;
}

export enum FormStep {
    One = 'one',
    Two = 'two',
    Three = 'three',
}

export enum FormType {
    LogIn = '#login',
    SignUp = '#signup',
}

export interface AuthBody {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface AuthFormType extends AuthBody {
    step: FormStep;
    type: FormType;
}
