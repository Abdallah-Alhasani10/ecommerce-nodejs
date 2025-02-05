import { NextFunction, Request, Response } from "express";
import { productvariantitemsserviecs } from "../../../services/db/productvarientitems";
import { HTTB_STATUS } from "../../../globals/constances/http";

class ProductVarientItemCotroller{
    public async addItem(req:Request,res:Response,next:NextFunction){
        const productId=parseInt(req.params.productId);
        const variantId=parseInt(req.params.variantId);
        const productVarientItem=await productvariantitemsserviecs.add(productId,variantId,req.body,req.currentuser)

        return res.status(HTTB_STATUS.CREATE).json({
            message:"Added is done",
            data:productVarientItem
        })
    }

    public async delete(req:Request,res:Response,next:NextFunction){
        const productId=parseInt(req.params.productId);
        const variantId=parseInt(req.params.variantId);
        const id=parseInt(req.params.id);
        await productvariantitemsserviecs.remove(productId,variantId,id,req.currentuser)
        return res.status(HTTB_STATUS.OK).json({
            message:"its deleted"
        })
    }
}

export const productvarientitemcotroller:ProductVarientItemCotroller=new ProductVarientItemCotroller();