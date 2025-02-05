import { Request,Response,NextFunction } from "express";
import { forbiddenExcption, UNAUTHORIZED_Exception } from "./error.middlware";
import jwt from "jsonwebtoken";
import { USERPAYLOAD } from "../../type";

export function vrefiyUser(req:Request,res:Response,next:NextFunction){
    if (!req.headers['authorization'] || !req.headers['authorization'].startsWith('Bearer')){
        throw new UNAUTHORIZED_Exception('Token is invlaid , please login agin')
    }
    const token=req.headers['authorization'].split(' ')[1]
    try{
        const userDecoded=jwt.verify(token,process.env.JWT_SECRET!) as USERPAYLOAD
        req.currentuser=userDecoded
        next();
    }
    catch(error){
        throw new UNAUTHORIZED_Exception('Token is invlaid , please login again')
    }
}

export function checkpremession(...roles:string[]){
    return (req:Request,res:Response,next:NextFunction)=>{
        console.log(req.currentuser)
        const role=req.currentuser?.role;
        console.log(role)
        if(!role || !roles.includes(role)){
            throw new forbiddenExcption("you are not allowed")
        }
        next();
    }
}
