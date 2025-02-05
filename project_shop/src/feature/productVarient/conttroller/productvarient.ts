import { NextFunction, Request, Response } from "express";
import { productvariantserviecs } from "../../../services/db/productvarientserviecs";
import { HTTB_STATUS } from "../../../globals/constances/http";

class ProductVariantControler{
    public async addVarient(req:Request,res:Response,next:NextFunction){
        const productvariant=await productvariantserviecs.add(parseInt(req.params.productid),req.body,req.currentuser)

        return res.status(HTTB_STATUS.OK).json({
            message:"Created is done",
            data:productvariant
        })
    }
    public async delete(req:Request,res:Response,next:NextFunction){
        await productvariantserviecs.remove(parseInt(req.params.productid),parseInt(req.params.id),req.currentuser)

        return res.status(HTTB_STATUS.OK).json({
            message:"deleted is done",
        })
    }
}

export const productvariantcontroler:ProductVariantControler=new ProductVariantControler();