import * as Yup from 'yup';

export interface FormValue {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export const initialValues: FormValue = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
};

const PasswordSchema = Yup.string()
    .min(6, 'To short! Password must be at least 6 characters')
    .max(128, 'Too Long!')
    .required('This is required field!');

export const FormSchema = Yup.object({
    oldPassword: PasswordSchema,
    newPassword: PasswordSchema,
    confirmPassword: PasswordSchema,
});
