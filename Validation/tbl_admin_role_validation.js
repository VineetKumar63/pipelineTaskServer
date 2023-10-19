const Joi = require("joi");

const adminRoleSchema = Joi.object ({
    role_id: Joi.string().min(2).max(20).required(),
    role_name: Joi.string().min(3).max(20).required() 
})

const tbl_admin_role_validation = (req, res, next) =>{
    const value = adminRoleSchema.validate(req.body)
    if (value.error){
        return res.status(400).json({error:value.error.details[0]})
    } else {
        {next()}
    }
}
module.exports = tbl_admin_role_validation