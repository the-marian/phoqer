import * as Yup from 'yup';

export const EditOfferFormSchema = Yup.object({
    title: Yup.string()
        .min(2, 'Too short! Write down at least a few words.')
        .max(300, 'Too Long!')
        .required('This is required field!'),

    description: Yup.string().min(10, 'Too short! Write down at least a few words.').required('This is required field!'),

    images: Yup.array().of(
        Yup.object({
            url: Yup.string(),
        }),
    ),

    price: Yup.number().min(0, 'The price cannot be negative').typeError('Invalid price').required('This is required field!'),

    saleFlag: Yup.boolean(),

    sale: Yup.object({
        description: Yup.string(),
        percentage: Yup.number()
            .min(0, 'The percentage cannot be negative')
            .typeError('Invalid percentage')
            .required('This is required field!'),
    }).when('saleFlag', {
        is: false,
        then: schema => schema.nullable(),
        otherwise: schema => schema.typeError('This is required field!'),
    }),

    category: Yup.object({
        slug: Yup.string().required('This is required field!'),
        title: Yup.string(),
    }).nullable(),
});
