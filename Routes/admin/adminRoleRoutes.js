const express = require ('express')
const AdminRole = new express.Router();
const {newRole,updateRole,viewRoles }= require('../../Controllers/admin/adminRoleController.js');
const tbl_admin_role_validation = require('../../Validation/tbl_admin_role_validation.js');

AdminRole.post('/api/admin/roles/newrole',tbl_admin_role_validation, newRole)
AdminRole.patch('/api/admin/roles/update/:role_id',updateRole)
AdminRole.get('/api/admin/roles/viewroles',viewRoles)
    
module.exports = {AdminRole}