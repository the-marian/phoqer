import Joi from 'joi';
import { CustomError } from '../../services/helpers';

const contentSchema = Joi.object({
    id: Joi.string(),
    content: Joi.string(),
}).required();

const validate = body => {
    const { error } = contentSchema.validate(body);
    if (error) throw new CustomError(error.details[0].message, 400);
};

export default validate;
