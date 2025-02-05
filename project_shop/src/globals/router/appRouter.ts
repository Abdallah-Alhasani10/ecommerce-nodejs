import express, { Application } from 'express'
import userRouter from '../../feature/user/router/userRouter'
import authRouter from '../../feature/user/router/auth.router'
import catergoryRoute from '../../feature/category/route/categoryroute'
import productRouter from '../../feature/product/route/product.route'
import ProductimagesRoute from '../../feature/productimages/route/productimagesRouter'
import ProductVariantRoute from '../../feature/productVarient/route/product_varient.route'
import ProductVariantitemRoute from '../../feature/productVarient/route/product_varient.items.route'
import wishlistRoute from '../../feature/wishlist/route/wishlist.route'

const appRouter=(app:Application)=>{
    app.use('/api/v1/users',userRouter)
    app.use('/api/v1/auth',authRouter)
    app.use('/api/v1/category',catergoryRoute)
    app.use('/api/v1/product',productRouter)
    app.use('/api/v1/productimages',ProductimagesRoute)
    app.use('/api/v1/productvariant',ProductVariantRoute)
    app.use('/api/v1/productvariantitem',ProductVariantitemRoute)
    app.use('/api/v1/wishlist',wishlistRoute)
}
export default appRouter