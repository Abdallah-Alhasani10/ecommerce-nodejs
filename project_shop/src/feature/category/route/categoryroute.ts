import { Router } from "express";
import { validateSchema } from "../../../globals/middlware/validate.middlware";
import { categoriesschema } from "../schema/schema.category";
import { asyncWapper } from "../../../globals/middlware/error.middlware";
import { category } from "../controller/category";

const catergoryRoute=Router();

catergoryRoute.post('/',validateSchema(categoriesschema),asyncWapper(category.createCatergory))
catergoryRoute.get('/',asyncWapper(category.getAll))
catergoryRoute.get('/:id',asyncWapper(category.getone))
catergoryRoute.put('/:id',validateSchema(categoriesschema),asyncWapper(category.update))
catergoryRoute.delete('/:id',asyncWapper(category.delete)) 


export default catergoryRoute 