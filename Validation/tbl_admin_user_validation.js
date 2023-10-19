const Joi = require('joi')

const adminUserschema = Joi.object({
    uid: Joi.string().min(3).max(20).required(),
    user_name: Joi.string().min(3).max(20).required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    mobile: Joi.string().required(),
    photo: Joi.any() ,
    aadhar: Joi.string().required(),
    dob: Joi.date().required(),
    qualification: Joi.string().required(),
    doj: Joi.date().required(),
    address: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    pincode: Joi.string().required(),
    status: Joi.string().default("Deactive")
})

const tbl_admin_user_validation = (req, res, next) =>{
    const value = adminUserschema.validate(req.body)
    if (value.error){
        return res.status(400).json({error:value.error.details[0]})
    } else {
        {next()}
    }

}

module.exports = tbl_admin_user_validation
