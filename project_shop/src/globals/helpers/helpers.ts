import { Product } from "@prisma/client";
import { forbiddenExcption } from "../middlware/error.middlware";

export class Helpers{
    public static checkpermission(currentproduct:Product,currentuser:any){
        if(currentuser.role==="ADMIN")
            return ;
        if(currentproduct.shopId===currentuser.id)
            return ;
        throw new forbiddenExcption("you are not allowed to do the updates")
    }
}