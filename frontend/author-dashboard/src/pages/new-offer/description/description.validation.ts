import * as Yup from 'yup';

export const DescriptionSchema = Yup.object().shape({
    description: Yup.string().min(10, 'Too short! Write down at least a few words.').required('This is required field!'),
});
