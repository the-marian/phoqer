import Joi from 'joi';

const contentSchema = Joi.object({
    id: Joi.string(),
    content: Joi.string(),
}).required();

const validate = body => {
    const { error } = contentSchema.validate(body);
    if (error) throw new Error(error.details[0].message);
};

export default validate;
