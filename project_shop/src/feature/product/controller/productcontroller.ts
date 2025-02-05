import { NextFunction, Request, Response } from "express";
import { proudctservices } from "../../../services/db/productServiecs";
import { HTTB_STATUS } from "../../../globals/constances/http";

class Porduct{
        public async create(req:Request,res:Response,next:NextFunction){
            const product=await proudctservices.add(req.body,req.currentuser,req.file)
            
            return res.status(HTTB_STATUS.CREATE).json({
                message:"product created",
                data:product
            })
        }

        // public async getallproduct(req:Request,res:Response,next:NextFunction){
        //     const allproducts=await proudctservices.read()
        //     return res.status(HTTB_STATUS.OK).json({
        //         message:"this is all data",
        //         total_length:allproducts.length,
        //         data:allproducts
        //     })
        // }

        public async getOneProduct(req:Request,res:Response,next:NextFunction){
            const product=await proudctservices.readOne(parseInt(req.params.id))
            return res.status(HTTB_STATUS.OK).json({
                data:product
            })
        }

        public async update(req:Request,res:Response,next:NextFunction){
            const product=await proudctservices.edit(parseInt(req.params.id),req.body,req.currentuser)
            return res.status(HTTB_STATUS.OK).json({
                message:"the product has been updated successfully",
                data:product
            })
        }

        public async delete(req:Request,res:Response,next:NextFunction){
            await proudctservices.remove(parseInt(req.params.id),req.currentuser)
            return res.status(HTTB_STATUS.OK).json({
                message:"the product has been deleted successfully",
            })
        }

        public async getallproduct(req:Request,res:Response,next:NextFunction){
            const page=parseInt(req.query.page as string)||1;
            const pagesize=parseInt(req.query.pagesize as string)|| 10;
            const sortBy=req.query.sortBy as string || 'createdAt';
            const sortDir=req.query.sortBy as string || 'asc';
            const where :any={};
            const opreations=["lt",'lte','gt','gte']
            const filterBy=req.query.filterBy as string;
            const filterparamsvalue=req.query.filterValue as string;
            if(filterBy){
                const [filtercondation,filterValue]=filterparamsvalue.split(".");
                if(filtercondation==='eq'){
                    where[filterBy]=parseInt(filterValue);
                }
                opreations.forEach(opreation=>{
                    if(filtercondation === opreation){
                        where[filterBy]={};
                        where[filterBy][filtercondation]=parseInt(filterValue);
                    }
                })
            }
            console.log(where)

            const products=await proudctservices.pagination(page,pagesize,sortBy,sortDir,where)
            return res.status(HTTB_STATUS.OK).json({
                message:`This is the  data on page ${page}`,
                data:products
            })
        }

        public async getMyproduct(req:Request,res:Response,next:NextFunction){
            const myproducts=await proudctservices.getmyproduct(req.currentuser)
            return res.status(HTTB_STATUS.OK).json({
                message:"All my products",
                data:myproducts
            })
        }
}

export const product:Porduct=new Porduct();