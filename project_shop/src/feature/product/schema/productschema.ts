import Joi from "joi";

export const productschema=Joi.object({
    name:Joi.string().required(),
    longDescription:Joi.string().required(),
    shortDescription:Joi.string().required(),
    quantity:Joi.number().integer().required(),
    main_image:Joi.string(),
    categoryid:Joi.number().integer().required()
})