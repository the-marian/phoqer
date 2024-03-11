import * as Yup from 'yup';

const getStringValidator = () => Yup.string().min(2, 'To short!').max(200, 'Too Long!').required('This is required field!');

export const LocationSchema = Yup.object().shape({
    country: getStringValidator(),
    city: getStringValidator(),
    zip: getStringValidator(),
    address: getStringValidator(),
    comment: Yup.string().max(500, 'Too Long!'),
});
