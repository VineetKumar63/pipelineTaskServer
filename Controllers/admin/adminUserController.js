const connection = require("../../Models/connect.js");

const addAdminUser = async (req, res) => {
    try { 
        const sqlQuery = "insert into tbl_adminuser set?";
        let user_data = req.body;
        let photo = req.file.location;
        user_data = { ...user_data, photo: photo }
        await connection.query(sqlQuery, user_data, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            }
            else {
                return res.status(200).json(result);
            }
        })
    } catch (error) {
        console.log("error found...",error)
    }
}

const updateUser = async (req, res) => {
    try {
        let uid = req.params.uid;
        let userData = req.body;
        let sqlQuery = `update tbl_adminuser SET? where uid= "${uid}"`;
        await connection.query(sqlQuery, [userData, uid], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error updating data" });
            }
            else {
                console.log(result)
                res.status(200).json({ message: "User updated successfully",result });
            }
        })
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAdminList = async (req, res) => {
    try {
        const sqlQuery = "select uid,user_name,email,mobile,photo,aadhar,dob,qualification,doj,address,city,state,pincode,status from tbl_adminuser";
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error getting data" });
            }
            else {
                res.status(200).json(result);
            }
        })
    } catch (error) {
        console.error("Error:Internal server error", error.message);
        res.status(500).json(error.sqlMessage);
    }
}

const getUserView = async (req, res) => {
    try {
        const uid = req.params.uid;
        const sqlQuery = `select uid,user_name,email,mobile,photo,aadhar,dob,qualification,doj,address,city,state,pincode,status from tbl_adminuser where uid =${uid}`;
        connection.query(sqlQuery, function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error getting data" });
            }
            else {
                res.status(200).json({ message: "Data fetching successful" }, result);
            }
        })
    } catch (error) {
        console.error("Error:Internal server error", error.message);
        res.status(500).json(error.sqlMessage);
    }
}

const updateStatus = async (req, res) => {
    try {
        const sqlQuery = `update tbl_adminuser SET status=? where uid =?`;
        const uid = req.query.uid;
        let newData = req.query.status;
        await connection.query(sqlQuery, [newData, uid], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error updating Status" });
            }
            else {
                res.status(200).json(result);
            }
        })
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }   
}

const updatePassword = async (req, res) => {
    try {
        const uid = req.params.uid;
        let newData = req.body.password;
        const sqlQuery = `update tbl_adminuser SET password=? where uid="${uid}"`;
        await connection.query(sqlQuery, [newData, uid], function (error,result) {
            if (error) {
                console.log("error", error.sqlMessage);
                return res.status(500).json({ error: "Error updating password" })
            } else {
                res.status(500).json({ message: "password change successfully"},result)
            }
        })
    } catch (error) {
        console.log("Error:", error.message);
        res.status(500).json({ error: "Internal Error" })
    }
}

module.exports = { addAdminUser, getAdminList, getUserView, updateStatus, updateUser, updatePassword }