import { NextFunction, Request, Response } from "express";
import { productImagesService } from "../../../services/db/productImages.servies";
import { HTTB_STATUS } from "../../../globals/constances/http";

class ProudctImagesController{
    public async addImages(req:Request,res:Response,next:NextFunction){
        const productid=parseInt(req.params.productid);
        const files=req.files as Express.Multer.File[];
        const data=await productImagesService.add(productid,req.currentuser,files)
        return res.status(HTTB_STATUS.OK).json({
            message:"we add the photo",
            data:data
        })
    }
    public async delete(req:Request,res:Response,next:NextFunction){
        await productImagesService.remove(parseInt(req.params.productId),parseInt(req.params.id),req.currentuser)
        return res.status(HTTB_STATUS.OK).json({
            message:"images are deleted"
        })
    }
}

export const proudctImagesController:ProudctImagesController=new ProudctImagesController();