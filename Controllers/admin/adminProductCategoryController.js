const connection = require('../../Models/connect.js');

const addCategory = async (req, res) => {
    try {
        const sqlQuery = " INSERT INTO tbl_admin_product_category SET?";
        const data = {
            prod_category_id: req.body.prod_category_id,
            prod_category_name: req.body.prod_category_name
        }
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            }
            else {
                console.log(result);
                res.status(200).json({ message: "Category added successfully" });
            }
        })
    }
    catch (error) {
        console.log("Error found")

    }
}

const viewCategory = async (req, res) => {
    try {
        const sqlQuery = " SELECT prod_category_id, prod_category_name FROM tbl_admin_product_category";
        await connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            }
            else {
                return res.status(200).json(result);
            }
        })
    }
    catch (error) {
        console.log("error found")
    }
}

const updateCategory = async (req,res) =>{
    try{
        const prod_category_id = req.params.prod_category_id;
    const newData = req.body;
    const  sqlQuery = `update tbl_admin_product_category SET? where prod_category_id="${prod_category_id}"`;
    await connection.query(sqlQuery,newData, function(error, result){
        if (error) {
            console.log("error", error.sqlMessage)
            return res.status(500).json({ error: "Error inserting data" });
        }
        else {
            console.log(result);
            res.status(200).json({ message: "Category updtated successfully" });
        }
    })
    }
    catch(error){
        console.log("error found")
    }
    
}

const findProduct = async(req,res) =>{
    try{
        const prod_category_name = req.params.prod_category_name;
        const sqlQuery = "select prod_category_id from tbl_admin_product_category where prod_category_name=?"
        await connection.query(sqlQuery, [prod_category_name], function(error, result){
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error fetching data" });
            }
            else {
                console.log(result);
                res.status(200).json({ message: "data fatching successfully" });
            }
        })


    }
    catch(error){
        console.log("error found")
    }
}

module.exports = { addCategory, viewCategory, updateCategory,findProduct }