import { ProductVarient } from "@prisma/client";
import { prisma } from "../../prisam";
import { proudctservices } from "./productServiecs";
import { Helpers } from "../../globals/helpers/helpers";
import { NOT_FOUND } from "../../globals/middlware/error.middlware";

class ProductVariantServiecs{
    public async add(productId:number,requestbody:any,currentuser:any):Promise<ProductVarient>{
        const {name}=requestbody;
        const currentproduct=await proudctservices.getproduct(productId);
        Helpers.checkpermission(currentproduct!,currentuser)
        const productvariant:ProductVarient=await prisma.productVarient.create({
            data:{
                name,
                productId
            }
        })
        return productvariant
    }

    public async remove(productId:number,id:number,currentuser:any){

        const currentproduct=await proudctservices.getproduct(productId);
        Helpers.checkpermission(currentproduct!,currentuser)

        const product=await prisma.product.findFirst({
            where:{
                id:productId
            },include:{
                productvarient:true
            }
        })
        
        const index=product!.productvarient.findIndex((item:any)=>item.id===id)
        if (index <= -1){
            throw new NOT_FOUND("not found in db")
        }
        await prisma.productVarient.delete({
            where:{
                id:id
            }
        })
    }
}

export const productvariantserviecs:ProductVariantServiecs=new ProductVariantServiecs();