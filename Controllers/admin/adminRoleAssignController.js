const connection = require('../../Models/connect.js')

const grantRole = async (req, res) => {
    try {
        const sqlQuery = "insert into tbl_admin_role_assign (`uid`,`role_id`) values(?)"
        console.log(req.uid)
        const data = [
            req.body.uid,
            req.body.role_id]
        await connection.query(sqlQuery, [data], function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error inserting data" });
            }
            else {
                // res.json(result);
                res.status(200).json({ message: "User added successfully" ,result});
            }
        })
    }
    catch (error) {
        console.log("error found")
    }
}

const checkRole = async (req,res) =>{
    try{
        const uid = req.params.uid;
        const sqlQuery = `SELECT role_name FROM tbl_admin_roles where role_id IN (SELECT role_id FROM tbl_admin_role_assign where uid="${uid}")`;
        await connection.query(sqlQuery, function(error,result){
        if (error) {
            console.log("error", error.sqlMessage)
            return res.status(500).json({ error: "Error getting data" });
        }
        else {
            res.status(200).json(result);
        }
    })
    }
    catch(error){
        console.log("Error Found")
    }
}

const viewAssignRoles = async (req,res) =>{
    try{
        const uid = req.params.uid;
        const sqlQuery = `SELECT (role_name FROM  where role_id=? ) and (user_name from adminuser where uid=?) where role_id =(SELECT role_id FROM tbl_admin_role_assign), `;
        await connection.query(sqlQuery, function(error,result){
        if (error) {
            console.log("error", error.sqlMessage)
            return res.status(500).json({ error: "Error getting data" });
        }
        else {
            res.status(200).json(result);
        }
    })
    }
    catch(error){
        console.log("Error Found")
    }
}

const changeRole = async (req,res) => {
    try{
    const uid = req.params.uid;
    const role_id= req.params.role_id;
    const userData = req.body.role_id;
    const sqlQuery = `UPDATE tbl_admin_role_assign set role_id=? where uid = "${uid}" AND role_id = "${role_id}"`;
    await connection.query(sqlQuery,userData, function(error,result){
        if (error) {
            console.log("error", error.sqlMessage)
            return res.status(500).json({ error: "Error getting data" });
        }
        else {
            res.status(200).json(result);
        }
    })
    }
    catch(error){
        console.log("error found")
    }
}

const revokeRole = async( req, res) =>{
    try{
        const uid = req.params.uid;
        const role_id= req.params.role_id;
        const userData = req.body.role_id;
        const sqlQuery = `DELETE FROM tbl_admin_role_assign where uid = "${uid}" AND role_id = "${role_id}"`
        await connection.query(sqlQuery, [userData,uid],function (error, result) {
            if (error) {
                console.log("error", error.sqlMessage)
                return res.status(500).json({ error: "Error updating Status" });
            }
            else {
                console.log(result);
                res.status(200).json({ message: "Role Revoked successfully" });
            }
        })
    }
    catch(error){
        console.log("error found")
    }
}


module.exports = {grantRole,checkRole,changeRole,revokeRole,viewAssignRoles};
