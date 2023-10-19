const connection = require ('..//../Models/connect.js')

const tbl_admin_offer_validation = require('../../Validation/tbl_admin_offer_validation.js')

const addOffer = async (req, res) => {
    try {
        const sqlQuery = `INSERT INTO tbl_admin_offer set?`;
        const data = req.body;
        await connection.query (sqlQuery, data, function (error,result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            } else {
                console.log(result)
            }
        })
    }
    catch(error){
        console.log("error found");
        res.status(500).json({ error: "Internal server error" });
    }
}
const findOffer=(req,res)=>{
    try {
        const discount=req.params.bydiscount
        const SqlQuery='SELECT * FROM tbl_admin_offer WHERE percentagediscount=? OR flatdiscount=? OR uptodiscount=?'

        connection.query(SqlQuery,[discount,discount,discount],(err,result)=>{
            if (err) {
                res.json(err)
            }
            else {
                res.json(result)
            }
        })
    } catch (error) {
        res.send(error)
    }
} 
const viewOffer= (req, res) => {
    try {
        let SqlQuery = "SELECT * FROM tbl_admin_offer"
      
            connection.query(SqlQuery,(err, result) => {
                if (err) {
                    res.json(err)
                }
                else {
                    res.json(result)
                }
                
            })    
    } catch (error) {
        res.send(error)
    }

}
const updateOffer=(req,res)=>{
    try {
        const data={
            percentagediscount:req.body.percentagediscount,
            flatdiscount:req.body.flatdiscount,
            uptodiscount:req.body.uptodiscount,
            uptodiscount:req.body.uptodiscount,
            validfrom:req.body.validfrom,
            validto:req.body.validto,
            termsandcondition:req.body.termsandcondition,
            status:req.body.status,
        }
        const offerid=req.params.offerid
        const SqlQuery='UPDATE tbl_admin_offer SET ? WHERE offerid = ?'

        connection.query(SqlQuery,[data,offerid],(err,result)=>{
            if (err) {
                res.json(err)
            }
            else {
                res.json(result)
            }
        })
    } catch (error) {
        res.send(error)
    }
}
const updateStatus=(req,res)=>{
    try {
        const offerid=req.params.offerid
        const status=req.body
        const SqlQuery='UPDATE tbl_admin_offer SET status =? WHERE offerid=?'

        connection.query(SqlQuery,[status,offerid],(err,result)=>{
            if (err) {
                res.json(err)
            }
            else {
                res.json(result)
            }
        })
    } catch (error) {
        res.send(error)
    }
}

module.exports = {addOffer,viewOffer, updateOffer, updateStatus, findOffer}