import { ProductVarientItem } from "@prisma/client";
import { prisma } from "../../prisam";
import { forbiddenExcption, NOT_FOUND } from "../../globals/middlware/error.middlware";
import { proudctservices } from "./productServiecs";
import { Helpers } from "../../globals/helpers/helpers";

class ProductVariantItemsServiecs{
    public async add(productId:number,variantId:number,requestbody:any,currentuser:any):Promise<ProductVarientItem>{
        const {name}=requestbody;
        const currentproduct=await proudctservices.getproduct(productId);
        Helpers.checkpermission(currentproduct!,currentuser)
        const productvairentitems:ProductVarientItem=await prisma.productVarientItem.create({
            data:{
                name,
                productvarientid:variantId
            }
        })
        return productvairentitems
    }

    public async remove(productId:number,variantId:number,id:number,currentuser:any):Promise<void>{
        const currentproduct=await proudctservices.getproduct(productId);
        Helpers.checkpermission(currentproduct!,currentuser)
        
        const variant:any=await prisma.productVarient.findFirst({
            where:{
                id:variantId
            },
            include:{
                productvarientitem:true
            }
        })
        if(!variant){
            throw new NOT_FOUND("not found in db")
        }
        const index=variant.productvairentitems.findIndex((item:any)=>item.id===id)
        if(index<-1){
            throw new NOT_FOUND("Not found in db")
        }
        await prisma.productVarientItem.delete({
            where:{
                id
            }
        })
    }
}

export const productvariantitemsserviecs:ProductVariantItemsServiecs=new ProductVariantItemsServiecs();