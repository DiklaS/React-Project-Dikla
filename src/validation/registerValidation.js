import Joi from "joi";

import validation from "./validation";

const registerSchema = Joi.object({
    firstName: Joi.string().min(2).max(255).label('First name').required(),
    middleName: Joi.string().min(2).max(255).label('Middle name').allow(""),
    lastName: Joi.string().min(2).max(255).label('Last name').required(),
    phone: Joi.string().min(9).max(14).label('Phone').required(),
    email: Joi.string().email({ tlds: { allow: false } }).required(),
    //password: Joi.string().min(6).max(20).pattern(new RegExp('^[a-zA-Z0-9]{6,20}$')).required(),
    password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,20}$'))
    .required()
    .messages({
        'string.pattern.base': 'Password must include uppercase letters, lowercase letters and numbers.',
        'any.required': 'Password is required.',
        'string.min': 'Password must be at least {#limit} characters long.',
        'string.max': 'Password must be at most {#limit} characters long.',
    }),

    imageUrl: Joi.string().min(6).max(1024).label('Image URL').allow(""),
    imageAlt: Joi.string().min(6).max(256).label('Image Alt').allow(""),
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.string().min(1).max(256).label('House number').required(),
    zipCode: Joi.number().min(1).max(256).label('ZIP').allow(""),
    biz: Joi.boolean(),
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

export default validateRegisterSchema;

//{ tlds: { allow: false } }
