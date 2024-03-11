import * as Yup from 'yup';

export const MAX_LENGTH = 128;

export const TitleSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too short! Write down at least a few words.')
        .max(MAX_LENGTH, 'Too Long!')
        .required('This is required field!'),
});
