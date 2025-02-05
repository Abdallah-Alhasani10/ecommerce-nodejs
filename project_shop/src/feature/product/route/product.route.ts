import { Router } from "express";
import { asyncWapper } from "../../../globals/middlware/error.middlware";
import { product } from "../controller/productcontroller";
import { validateSchema } from "../../../globals/middlware/validate.middlware";
import { productschema } from "../schema/productschema";
import { checkpremession, vrefiyUser } from "../../../globals/middlware/authMiddleware";
import { checkPreferences } from "joi";
import { verify } from "jsonwebtoken";
import { upload } from "../../../globals/constances/multer";


const productRouter=Router();

productRouter.post('/',vrefiyUser,checkpremession("SHOP","ADMIN"),validateSchema(productschema),upload.single("main_image"),asyncWapper(product.create))
productRouter.get('/',asyncWapper(product.getallproduct))
productRouter.get('/myproducts',vrefiyUser,asyncWapper(product.getMyproduct))
productRouter.get('/:id',asyncWapper(product.getOneProduct))
productRouter.put('/:id',vrefiyUser,validateSchema(productschema),checkpremession("SHOP","ADMIN"),asyncWapper(product.update))
productRouter.delete('/:id',vrefiyUser,checkpremession("SHOP","ADMIN"),asyncWapper(product.delete))

export default productRouter
