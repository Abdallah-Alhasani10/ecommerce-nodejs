import { Router } from "express";
import { proudctImagesController } from "../controller/controller";
import { upload } from "../../../globals/constances/multer";
import { asyncWapper } from "../../../globals/middlware/error.middlware";
import { checkpremession, vrefiyUser } from "../../../globals/middlware/authMiddleware";

const ProductimagesRoute=Router();

ProductimagesRoute.post('/:productid',vrefiyUser,checkpremession("ADMIN","SHOP"),upload.array("images",10),asyncWapper(proudctImagesController.addImages))
ProductimagesRoute.delete('/:productid/:id',vrefiyUser,checkpremession("ADMIN","SHOP"),asyncWapper(proudctImagesController.delete))

export default ProductimagesRoute;