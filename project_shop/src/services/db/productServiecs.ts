import { Product } from "@prisma/client";
import { prisma } from "../../prisam";
import { forbiddenExcption } from "../../globals/middlware/error.middlware";
import { Iproudct } from "../../feature/product/interface/Iproduct";
import { Helpers } from "../../globals/helpers/helpers";

class ProudctServices{
    public async add(requestbody:Iproudct,currentuser:any,file:Express.Multer.File| undefined):Promise<Product>{
        const {name,longDescription,shortDescription,quantity,main_image,categoryid}=requestbody;

        const product:Product=await prisma.product.create({
            data:{
                name,longDescription,shortDescription,quantity,
                main_image:file?.filename?file.filename:''
                ,categoryid,shopId:currentuser.id
            }
        })
        return product
    }

    public async read():Promise<Product []>{
        const product:Product[]=await prisma.product.findMany()
        return product 
    }

    public async readOne(id: number){
        if (!(await this.findProduct(id))) {
            throw new forbiddenExcption(`This id ${id} not found`);
        }
        const product = await prisma.product.findFirst({
            where: {
                id
            }
        });
        return product;
    }

    public async edit(id:number,requestbody:Iproudct,currentuser:any){
        const {name,longDescription,shortDescription,quantity,main_image,categoryid}=requestbody;
        if(!await this.findProduct(id)){
            throw new forbiddenExcption("not found in db to edit")
        }
        const currentproduct=await this.getproduct(id);
        Helpers.checkpermission(currentproduct!,currentuser)
        const product=await prisma.product.update({
            where:{
                id
            },data:{
                name,longDescription,shortDescription,quantity,main_image,categoryid,shopId:currentuser.id
            }
        })
        return product
    }
    
    public async remove(id:number,currentuser:any){
        if(!await this.findProduct(id)){
            throw new forbiddenExcption("not found in db to delete")
        }
        const product=await this.getproduct(id)
        Helpers.checkpermission(product!,currentuser)
        await prisma.product.delete({
            where:{
                id
            }
        })
    }

    public async pagination(page:number=1,pagesize:number=5,sortBy:string='createdAt',sortDir:string='desc',
        where:{}
    ):Promise<Product[]>{
        const skip:number=(page-1)*pagesize;
        const take:number=pagesize;
        const product:Product[]=await prisma.product.findMany({
            where,
            skip,
            take,
            orderBy:{
                [sortBy]:sortDir
            }
        })

        return product
    }

    private async findProduct(id: number): Promise<boolean> {
        const findId = await prisma.product.findFirst({
            where: {
                id: id
            },include:{
                prodcutimages:true,
                productvarient:{
                    include:{
                        productvarientitem:true
                    }
                }
            }
        });
        
        console.log(findId != null);
        return findId != null;
    }
    public async getproduct(id:number){
        const product=await prisma.product.findFirst({
            where:{
                id
            }
        });
        return product;
    }

    public async getmyproduct(currentuser:any){
        const product=await prisma.user.findMany({
            where:{
                id:currentuser.id
            },
            include:{
                product:true
            }
        })
        return product
    }
}

export const proudctservices:ProudctServices=new ProudctServices();