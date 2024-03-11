import { object, string } from 'yup';

import { FormStep, FormType } from 'src/components/form/type';

export const ResetSchema = object().shape({
    email: string().email('Invalid email').max(100, 'Too Long!').required('This is required field!'),
});

export const AuthSchema = object().shape({
    step: string().oneOf([FormStep.One, FormStep.Two, FormStep.Three]),
    type: string().oneOf([FormType.LogIn, FormType.SignUp]),

    email: string().email('Invalid email').max(128, 'Too Long!').required('This is required field!'),
    password: string()
        .min(6, 'To short! Password must be at least 6 characters')
        .max(128, 'Too Long!')
        .when('step', {
            is: (value: FormStep) => value === FormStep.One,
            then: () => string().optional().nullable(),
            otherwise: schema => schema.required('This is required field!'),
        }),
    firstName: string()
        .min(1, 'To short!')
        .max(80, 'Too Long!')
        .when('type', {
            is: (value: FormType) => value === FormType.SignUp,
            then: schema => schema.required('This is required field!'),
            otherwise: () => string().optional().nullable(),
        }),
    lastName: string()
        .min(1, 'To short!')
        .max(80, 'Too Long!')
        .when('type', {
            is: (value: FormType) => value === FormType.SignUp,
            then: schema => schema.required('This is required field!'),
            otherwise: () => string().optional().nullable(),
        }),
});
