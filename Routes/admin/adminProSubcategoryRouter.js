const express = require ('express')

const AdminProSubCategory = new express.Router();
const {addSubcategory,updatesSubCategory,findSubcategory,viewsubCategory, listsubCategory} = require ('../../Controllers/admin/adminProductSubCatController.js')

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

AdminProSubCategory.post('/api/admin/subcategory/addSubcategory',upload.single('photo'),addSubcategory)
AdminProSubCategory.patch('/api/admin/subcategory/updateSubcategory/:pro_subcategory_id',updatesSubCategory)
AdminProSubCategory.post('/api/admin/subcategory/findSubcategory/:pro_subcategory_name',findSubcategory)
AdminProSubCategory.get('/api/admin/subcategory/viewSubcategory/:pro_subcategory_id',viewsubCategory)
AdminProSubCategory.get('/api/admin/subcategory/viewSubcategory',listsubCategory)


module.exports = {AdminProSubCategory}