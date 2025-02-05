import { ProductImages } from "@prisma/client";
import { prisma } from "../../prisam";
import { Helpers } from "../../globals/helpers/helpers";
import { proudctservices } from "./productServiecs";

class ProductImagesService {
    
    public async add(productId: number,currentuser:any, files: Express.Multer.File[]) {
        const currentproduct=await proudctservices.getproduct(productId);
        Helpers.checkpermission(currentproduct!,currentuser)
        const productImages: ProductImages[] = [];
        for (const file of files) {
            productImages.push({
                images: file.filename, 
                productId
            } as ProductImages);
        }
        await prisma.productImages.createMany({
            data:productImages
        })
        console.log(productImages);
        return productImages
    }

    public async remove(productId:number,id:number,currentuser:any){

        const currentproduct=await proudctservices.getproduct(productId);
        Helpers.checkpermission(currentproduct!,currentuser)

        await prisma.productImages.delete({
            where:{id}
        })
    }
}

export const productImagesService: ProductImagesService = new ProductImagesService();
