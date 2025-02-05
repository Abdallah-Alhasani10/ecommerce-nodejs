import { Router} from "express";
import { asyncWapper } from "../../../globals/middlware/error.middlware";
import { productvariantcontroler } from "../conttroller/productvarient";
import { checkpremession, vrefiyUser } from "../../../globals/middlware/authMiddleware";

const ProductVariantRoute=Router();

ProductVariantRoute.post('/:productid',vrefiyUser,checkpremession("ADMIN","SHOP"),asyncWapper(productvariantcontroler.addVarient))
ProductVariantRoute.delete('/:productid/:id',vrefiyUser,checkpremession("ADMIN","SHOP"),asyncWapper(productvariantcontroler.delete))


export default ProductVariantRoute;