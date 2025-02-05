import { Categroy } from "@prisma/client";
import { prisma } from "../../prisam";
import { NOT_FOUND } from "../../globals/middlware/error.middlware";

class CategoryServices{
    public async add(requestbody:any):Promise<Categroy>{
        const {name,icon}=requestbody;
        const category:Categroy=await prisma.categroy.create({
            data:{
                name,icon
            }
        })
        return category
    }

    public async read():Promise<Categroy[]>{
        const catergory:Categroy[]=await prisma.categroy.findMany();
        return catergory
    }

    public async readone(id :number):Promise<Categroy>{
        const catergory=await prisma.categroy.findFirst({
            where:{
                id
            }
        });
        if (!catergory){
            throw new NOT_FOUND(`This ${id} not found in our app`)
        }
        return catergory
    }


    public async edit(id:number,requestbody:any):Promise<Categroy>{
        const {name,icon}=requestbody;
        if (await this.cateroycount(id)<=0){
            throw new NOT_FOUND(`Error this id ${id} not found in our app`)
        }

        const category:Categroy=await prisma.categroy.update({
            where:{
                id
            },
            data:{
                name,icon
            }
        })

        return category
    }


    public async remove(id:number){
        if (await this.cateroycount(id)<=0){
            throw new NOT_FOUND(`Error this id ${id} not found in our app`)
        }
        await prisma.categroy.delete({
            where:{
                id
            }
        })
    }

    private async cateroycount(id :number):Promise<number>{
        const count=await prisma.categroy.count({
            where:{
                id
            }
        })
        return count
    }
}

export const categoryservices:CategoryServices=new CategoryServices();