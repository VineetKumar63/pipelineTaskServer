const joi = require ('joi');

const offerSchema = joi.object({
    offerid:joi.string().min(3).required(),
    offername:joi.string().min(3).required(),
    percentage_discount:joi.number().max(4),
    flat_discount:joi.number().max(4),
    valid_from:joi.date().required,
    valid_upto:joi.date().required,
    terms_and_conditions:joi.string().max(10),
    status:joi.string().required
})

const tbl_admin_offer_validation = (req, res, next) => {
    const value = offerSchema.validate(req.body)
    if (value.error){
        return res.status(400).json({error:value.error.details[0]})
    } else {
        {next()};
    }

    module.exports = tbl_admin_offer_validation;
}