import { object, string } from 'yup';

export const LoginSchema = object().shape({
    email: string().email('Invalid email').max(128, 'Too Long!').required('Email is required field!'),
    password: string()
        .min(5, 'To short! Password must be at least 5 characters')
        .max(128, 'Too Long!')
        .required('Password is required field!'),
});

export const JoinSchema = LoginSchema.shape({
    firstName: string().min(1, 'To short!').max(100, 'Too Long!').required('First name is required field!'),
    lastName: string().min(1, 'To short!').max(100, 'Too Long!').required('Surname is required field!'),
});
