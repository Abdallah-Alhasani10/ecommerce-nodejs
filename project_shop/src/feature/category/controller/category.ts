import { NextFunction, Request, Response } from "express";
import { categoryservices } from "../../../services/db/categoryservices";
import { HTTB_STATUS } from "../../../globals/constances/http";

class Category{
    public async createCatergory(req:Request,res:Response,next:NextFunction){
        const catergory=await categoryservices.add(req.body)
        return res.status(HTTB_STATUS.CREATE).json({
            message:"catergory created",
            data:catergory
        })
    }

    public async getAll(req:Request,res:Response,next:NextFunction){
        const categroy=await categoryservices.read();
        return res.status(HTTB_STATUS.OK).json({
            message:"This is all categories",
            data:categroy
        })
    }

    public async getone(req:Request,res:Response,next:NextFunction){
        const category=await categoryservices.readone(parseInt(req.params.id))
        return res.status(HTTB_STATUS.OK).json({
            data:category
        })
    }

    public async delete(req:Request,res:Response,next:NextFunction){
        const categroyupdated=await categoryservices.remove(parseInt(req.params.id));
        return res.status(HTTB_STATUS.OK).json({
            message:"The category has been deleted",
        })
    }

    public async update(req:Request,res:Response,next:NextFunction){
        const categroyupdated=await categoryservices.edit(parseInt(req.params.id),req.body);
        return res.status(HTTB_STATUS.OK).json({
            message:"The category has been updated",
            data:categroyupdated
        })
    }
}

export const category:Category=new Category();