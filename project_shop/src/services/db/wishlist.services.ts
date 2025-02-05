import { Wishlish } from "@prisma/client";
import { prisma } from "../../prisam";
import { forbidden } from "joi";
import { forbiddenExcption } from "../../globals/middlware/error.middlware";

class WishlistServices{
    public async addItem(requestbody:any,currentuser:any):Promise<void>{
        const {productId}=requestbody;

        if(await this.getWishlist(productId,currentuser.id)){
            throw new forbiddenExcption(`its already exist ${productId}`)
        }

        await prisma.wishlish.create({
            data:{
                productId,
                userId:currentuser.id
            }
        })
    }


    public async remove(productId:number,currentuser:any):Promise<void>{
        if(await this.getcountwishlist(productId,currentuser.id)<=0){
            throw new forbiddenExcption("wishlist in db not found")
        }
        await prisma.wishlish.delete({
            where:{
                userId_productId:{
                    productId,
                    userId:currentuser.id
                }
            }
        })
    }


    public async getmywishlist(currentuser:any):Promise<Wishlish[]>{
        const wishlish:Wishlish[]=await prisma.wishlish.findMany({
            where:{
                userId:currentuser.id
            }
        })
        return wishlish
    }

    private async getWishlist(productId:number,userId:number):Promise<Wishlish | null>{
        const wishlish:Wishlish| null =await prisma.wishlish.findFirst({
            where:{
                productId,
                userId
            }
        })
        return wishlish
    }

    private async getcountwishlist(productId:number,userId:number):Promise<number>{
        const count=await prisma.wishlish.count({
            where:{
                productId,
                userId
            }
        })
        return count
    }


}

export const wishlistservices:WishlistServices=new WishlistServices()