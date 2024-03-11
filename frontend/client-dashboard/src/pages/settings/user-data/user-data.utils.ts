import * as Yup from 'yup';

const StringSchema = Yup.string().max(128, 'Too Long!').required('This is required field!');

export const FormSchema = Yup.object({
    firstName: StringSchema.clone(),
    lastName: StringSchema.clone(),
    email: StringSchema.clone().email('Enter a valid email'),
});
