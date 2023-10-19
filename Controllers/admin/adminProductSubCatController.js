const connection = require('../../Models/connect.js')

const addSubcategory = async (req, res) => {
    try {
        const sqlQuery = "insert into tbl_admin_pro_subcategory set?"
        let pro_data = req.body
        let photo=req.file.location;
        pro_data={...pro_data,photo:photo}
        console.log(pro_data)

        await connection.query(sqlQuery, pro_data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            }
            else {
                res.status(200).json({ message: "sub category added successfully" });
            }
        })
    }
    catch (error) {
        console.log("error found")
    }
}

const viewsubCategory = async (req, res) => {
    try {
        const pro_subcategory_id = req.params.pro_subcategory_id;
        
        const sqlQuery = `SELECT (SELECT prod_category_name FROM tbl_admin_product_category WHERE prod_category_id = (SELECT prod_category_id FROM tbl_admin_pro_subcategory WHERE pro_subcategory_id = "${pro_subcategory_id}")) AS prod_category_name, photo, addon FROM tbl_admin_pro_subcategory WHERE pro_subcategory_id = ?`;

        await connection.query(sqlQuery, [ pro_subcategory_id], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                return res.status(500).json({ error: "Error fetching data" });
            } else {
                res.status(200).json({ message: "Data fetching successful", data: result });
            }
        });
    }
    catch (error) {
        console.log("Error found")
    }
}

const updatesSubCategory = async (req, res) => {
    try {
        const pro_subcategory_id = req.param.pro_subcategory_id;
        let userData = req.body;
        let sqlQuery = 'update tbl_admin_pro_subcategory SET? where pro_subcategory_id=?';
        await connection.query(sqlQuery, [userData, pro_subcategory_id], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error updating data" });
            }
            else {
                console.log(result)
                res.status(200).json({ message: "User updated successfully" });
            }
        })

    }
    catch (error) {
        console.log("error found")
    }
}

const findSubcategory = async (req, res) => {
    try {
        const pro_subcategory_name = req.params.pro_subcategory_name;
        const sqlQuery = "SELECT prod_category_id, photo FROM tbl_admin_pro_subcategory WHERE pro_subcategory_name LIKE ?";
        const searchTerm = '%' + pro_subcategory_name + '%';
        await connection.query(sqlQuery, [searchTerm], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                return res.status(500).json({ error: "Error fetching data" });
            } else {
                console.log(result);
                res.status(200).json({ message: "Data fetching successful", data: result });
            }
        });
    } catch (error) {
        console.log("error found");
    }
};

const listsubCategory = async (req, res) => {
    try {
        let sqlQuery = "SELECT prod_category_id,pro_subcategory_id,pro_subcategory_name, photo, addon FROM tbl_admin_pro_subcategory";

        await connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage);
                return res.status(500).json({ error: "Error fetching data" });
            } else {
                return res.status(200).json(result);
            }
        });
    }
    catch (error) {
        console.log("Error found")
    }
}


module.exports = { addSubcategory, updatesSubCategory, findSubcategory, viewsubCategory,listsubCategory }