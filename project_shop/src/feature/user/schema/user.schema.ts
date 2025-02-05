import joi from 'joi'

export const userschemaCreate=joi.object({
    email:joi.string().required(),
    password:joi.string().required(),
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    avatar:joi.optional(),
    role:joi.optional()
})

export const userschemalogin=joi.object({
    email:joi.string().required(),
    password:joi.string().required(),
})