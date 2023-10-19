const connection = require('../../Models/connect.js')

const newRole = async (req, res) => {
    try {
        const sqlQuery = "insert into tbl_admin_roles set?"
        const data = {
            role_id: req.body.role_id,
            role_name: req.body.role_name
        }
        await connection.query(sqlQuery, data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" })
            } else {
                console.log("success", result.sqlMessage)
                res.status(200).json({ message: "Role added successfully" });
            }
        })
    }
    catch (error) {
        console.log("error found...")
    }
}

const updateRole = async (req, res) => {
    try {
        let role_id = req.params.role_id
        const userData = req.body;
        const sqlQuery = "update tbl_admin_roles set? where role_id = ?"
        await connection.query(sqlQuery, [userData, role_id], function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).json({ error: "error updating data" })
            } else {
                res.status(200).json(result)
            }
        })
    }
    catch (error) {
        console.log("Error Found")
    }
}

const viewRoles = async (req, res) => {
    try {
        const sqlQuery = "select role_id, role_name from tbl_admin_roles";
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("Error", error.sqlMessage)
                res.status(500).json({ error: "error in getting data" })
            } else {
                res.status(200).json(result)
                
            }
        })
    }
    catch (error) {
        console.log("error found")
    }

}

module.exports = { newRole, updateRole, viewRoles };