import { func } from "joi";
import multer from "multer";
import path from 'path'

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        const upload=path.join(__dirname,'../../images','products')
        cb(null,upload)
    },
    filename:function(req,file,cb){
        const uniquesuffix=Date.now()+"-"+Math.round(Math.random()*1E9)
        cb(null,`${uniquesuffix}-${file.filename}`)
    }
})

export const upload=multer({storage:storage});