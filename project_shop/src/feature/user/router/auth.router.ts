import express from'express'

import { validateSchema } from '../../../globals/middlware/validate.middlware';
import { userschemaCreate, userschemalogin } from '../schema/user.schema';
import { asyncWapper } from '../../../globals/middlware/error.middlware';
import { authcontrollers } from '../controllers/authController';
import { checkpremession, vrefiyUser } from '../../../globals/middlware/authMiddleware';
import { verify } from 'jsonwebtoken';
const authRouter=express.Router();

authRouter.post('/register',validateSchema(userschemaCreate),asyncWapper(authcontrollers.registerUser))
authRouter.post('/login',validateSchema(userschemalogin),asyncWapper(authcontrollers.loginUser))
authRouter.get('/me',vrefiyUser,asyncWapper(authcontrollers.getme))
authRouter.get('/all',vrefiyUser,checkpremession("ADMIN"),asyncWapper(authcontrollers.getallusers))
export default authRouter