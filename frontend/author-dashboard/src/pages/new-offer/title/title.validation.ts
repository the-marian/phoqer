import * as Yup from 'yup';

export const TitleSchema = Yup.object().shape({
    title: Yup.string()
        .min(2, 'Too short! Write down at least a few words.')
        .max(300, 'Too Long!')
        .required('This is required field!'),
});
