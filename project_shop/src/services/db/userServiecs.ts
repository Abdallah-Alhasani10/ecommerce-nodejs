import { User } from "@prisma/client";
import { prisma } from "../../prisam";
import bcrypt from 'bcrypt'
import { authservices } from "./auth.services";
import { BAD_REQUST_EXCEPTION } from "../../globals/middlware/error.middlware";

class UserServices{
    public async adduser(requestbody:any){
        const{email,password,firstName,lastName,avatar}=requestbody;
        if(await authservices.isEmailAlreadyExist(email)){
            throw new BAD_REQUST_EXCEPTION("email is already exsit")
        }
        const hashedpassword=await bcrypt.hash(password,10);
        const newuser: User = await prisma.user.create({
        data: {
                email,
                password:hashedpassword,
                firstName,
                lastName,
                avatar
            }
        });

        return {
            email:newuser.email,
            firstName:newuser.firstName,
            lastName:newuser.lastName,
            avatar:newuser.avatar,
            role:newuser.role
        }
    }

}

export const userservices:UserServices=new UserServices();