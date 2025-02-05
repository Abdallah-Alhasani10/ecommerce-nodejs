import express from'express'
import { usercontrollers } from '../controllers/user.controller';
import { validateSchema } from '../../../globals/middlware/validate.middlware';
import { userschemaCreate } from '../schema/user.schema';
import { asyncWapper } from '../../../globals/middlware/error.middlware';
import { vrefiyUser } from '../../../globals/middlware/authMiddleware';

const userRouter=express.Router();

userRouter.post('/',validateSchema(userschemaCreate),asyncWapper( usercontrollers.createUser))
userRouter.get('/',vrefiyUser,asyncWapper( usercontrollers.getme))

export default userRouter