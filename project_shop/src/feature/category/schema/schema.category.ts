import { join } from "@prisma/client/runtime/library";
import Joi from "joi";

export const categoriesschema=Joi.object({
    name:Joi.string().required(),
    icon:Joi.string().required()
})