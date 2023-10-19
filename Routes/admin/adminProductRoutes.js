const express = require ("express");
const AdminProductCategory = new express.Router();

const {addCategory,viewCategory, updateCategory,findProduct} = require ('../../Controllers/admin/adminProductCategoryController.js');

AdminProductCategory.post('/api/admin/category/addCategory',addCategory)
AdminProductCategory.get('/api/admin/category/viewCategory',viewCategory)
AdminProductCategory.patch('/api/admin/category/updateCategory/:prod_category_id',updateCategory)
AdminProductCategory.post('/api/admin/category/findCategory/:prod_category_name',findProduct)


module.exports = {AdminProductCategory}