import { NextFunction, Request, Response } from "express";
import { authservices } from "../../../services/db/auth.services";
import { HTTB_STATUS } from "../../../globals/constances/http";
import { BAD_REQUST_EXCEPTION } from "../../../globals/middlware/error.middlware";

class AuthControllers{
    public async getallusers(req:Request,res:Response,next:NextFunction) {
        const users=await authservices.getAlluser();
        return res.status(HTTB_STATUS.OK).json({
            message:"this the all users in the system",
            totallength:users.length,
            data:users
        })
    }

    public async registerUser(req:Request,res:Response,next:NextFunction){
        if(await authservices.isEmailAlreadyExist(req.body.email)){
            next (new BAD_REQUST_EXCEPTION('email already exist'))
        }
        const accessToken =await authservices.addUser(req.body)
        res.status(HTTB_STATUS.OK).json({
            message:'User register successfully',
            accessToken
        })
    }
    public async loginUser(req:Request,res:Response,next:NextFunction){
        const accessToken =await authservices.login(req.body)
        res.status(HTTB_STATUS.OK).json({
            message:'User login successfully',
            accessToken
        })
    }
    public async getme(req:Request,res:Response,next:NextFunction){
        const me=await authservices.geti(req.currentuser)
        res.status(HTTB_STATUS.OK).json({
            data:me
        })
    }

}
export const authcontrollers:AuthControllers=new AuthControllers()