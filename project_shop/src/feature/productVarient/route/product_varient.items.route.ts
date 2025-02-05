import { Router} from "express";
import { asyncWapper } from "../../../globals/middlware/error.middlware";
import { checkpremession, vrefiyUser } from "../../../globals/middlware/authMiddleware";
import { productvariantcontroler } from "../conttroller/productvarient";
import { productvarientitemcotroller } from "../conttroller/product_varient_item";


const ProductVariantitemRoute=Router();

ProductVariantitemRoute.post('/:productid/:variantId',vrefiyUser,checkpremession("ADMIN","SHOP"),asyncWapper(productvarientitemcotroller.addItem))
ProductVariantitemRoute.delete('/:productid/:variantId/:id',vrefiyUser,checkpremession("ADMIN","SHOP"),asyncWapper(productvarientitemcotroller.delete))


export default ProductVariantitemRoute;