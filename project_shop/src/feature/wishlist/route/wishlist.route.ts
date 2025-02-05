import { Router } from "express";
import { vrefiyUser } from "../../../globals/middlware/authMiddleware";
import { asyncWapper } from "../../../globals/middlware/error.middlware";
import { wishlistcontroller } from "../controller/wishlist.controller";

const wishlistRoute=Router();

wishlistRoute.post('/',vrefiyUser,asyncWapper(wishlistcontroller.add));
wishlistRoute.delete('/:productId',vrefiyUser,asyncWapper(wishlistcontroller.delete));
wishlistRoute.get('/',vrefiyUser,asyncWapper(wishlistcontroller.read));

export default wishlistRoute;