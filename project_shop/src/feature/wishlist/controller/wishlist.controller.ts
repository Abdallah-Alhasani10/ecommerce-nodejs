import { NextFunction, Request, Response } from "express";
import { wishlistservices } from "../../../services/db/wishlist.services";
import { HTTB_STATUS } from "../../../globals/constances/http";

class WishlistController{
    public async add(req:Request,res:Response,next:NextFunction){
        await wishlistservices.addItem(req.body,req.currentuser)

        return res.status(HTTB_STATUS.CREATE).json({
            message:"creadted is done"
        })
    }

    public async delete(req:Request,res:Response,next:NextFunction){
        await wishlistservices.remove(parseInt(req.params.productId),req.currentuser)

        return res.status(HTTB_STATUS.OK).json({
            message:"deleted is done"
        })
    }

    public async read(req:Request,res:Response,next:NextFunction){
        const wishlish=await  wishlistservices.getmywishlist(req.currentuser)

        return res.status(HTTB_STATUS.OK).json({
            message:"this is all my wishlist",
            length:wishlish.length,
            data:wishlish
        })
    }
}

export const wishlistcontroller:WishlistController=new WishlistController();