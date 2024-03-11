import * as Yup from 'yup';

export const ParametersSchema = Yup.object().shape({
    price: Yup.number().min(0, 'The price cannot be negative').typeError('Invalid price').required('This is required field!'),
});
