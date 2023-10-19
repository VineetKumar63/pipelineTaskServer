const express = require('express')
const AdminRoleAssign = express.Router();

const {grantRole, checkRole, changeRole, revokeRole} = require ('../../Controllers/admin/adminRoleAssignController.js')

AdminRoleAssign.post('/api/admin/role/assign/grantRole',grantRole)
AdminRoleAssign.get('/api/admin/role/assign/checkRole/:uid',checkRole)
AdminRoleAssign.put('/api/admin/role/assign/changeRole/:uid/:role_id',changeRole)
AdminRoleAssign.delete("/api/admin/role/assign/revokeRole/:uid",revokeRole)

module.exports = {AdminRoleAssign}