const express = require('express')
const AdminUser = express.Router();
const tbl_admin_user_validation = require('../../Validation/tbl_admin_user_validation.js')

const { addAdminUser,getAdminList, getUserView, updateUser, updateStatus, updatePassword } = require("../../Controllers/admin/adminUserController.js")

const multer = require('multer')
const multerS3 = require('multer-s3')
const { S3Client } = require('@aws-sdk/client-s3')
//////AWS S3 configuration/////////
const s3 = new S3Client({
    region: 'ap-south-1',
    credentials:{
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey:process.env.AWS_SECRET_KEY
    }
})

////////////for updoading to s3///////
const storage = multerS3({
    s3:s3,
    bucket:'vinebazaar',
    acl:'public-read', 
    metadata:(req, file, cb)=>{
        cb(null, {fieldName: file.fieldname})
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key:(req, file, cb)=>{
        cb(null, file.originalname)
    }
})
let upload = multer({storage:storage})


AdminUser.post("/api/admin/registeruser",upload.single('photo'),tbl_admin_user_validation, addAdminUser);
AdminUser.put("/api/admin/userupdate/:uid",tbl_admin_user_validation, updateUser)
AdminUser.post("/api/admin/userlist", getAdminList)
AdminUser.put("/api/admin/userstatus/",updateStatus)
AdminUser.patch("/api/admin/userpassword/:uid",updatePassword)
AdminUser.get("/api/admin/userById/:uid",getUserView)

module.exports = { AdminUser }  