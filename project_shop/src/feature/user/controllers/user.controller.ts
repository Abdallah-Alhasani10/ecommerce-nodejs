import { NextFunction, Request, Response } from "express";
import { HTTB_STATUS } from "../../../globals/constances/http";
import { userservices } from "../../../services/db/userServiecs";


class UserControllers{
    public async createUser(req:Request,res:Response){
        const newuser=await userservices.adduser(req.body)

        return res.status(HTTB_STATUS.CREATE).json({
            message:"new user is created",
            data:newuser
        })
    }
    public async getme(req:Request,res:Response,next:NextFunction){
    
        res.status(HTTB_STATUS.OK).json({
            message:'moaz',
        })
    }
}
export  const usercontrollers:UserControllers =new UserControllers()