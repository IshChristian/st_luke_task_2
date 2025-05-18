const express = require('express');
const Router = express.Router();
const db = require("./conn");
const conn = db();

Router.post('/register', (req, res) => {
    const {name, dob, gender, phone, role, password} = req.body
    const sql = "INSERT INTO `Patient`(`name`, `date_of_birth`, `gender`, `phone`, `password`, role) VALUES (?,?,?,?,?,?)";
    conn.query(sql, [name, dob, gender, phone, password, role], (err, result) => {
        if(err){
            console.log(err)
            res.status(500).json('server error')
        }
        res.status(200).json({message: "patient create account successfully", data: result})
    })
})

Router.post('/login', (req, res) => {
    const { phone, password } = req.body;
    
    // First check the Patient table
    const patientSql = "SELECT * FROM Patient WHERE phone=? AND password=?";
    conn.query(patientSql, [phone, password], (err, patientResult) => {
        if(err){
            return res.status(500).json("server error");
        }
        
        if(patientResult.length > 0) {
            return res.status(200).json({
                message: "login successfully as patient", 
                user: patientResult[0],
                role: 'patient'
            });
        }
        
        // If not found in Patient table, check Admin table
        const adminSql = "SELECT * FROM Admin WHERE phone=? AND password=?";
        conn.query(adminSql, [phone, password], (err, adminResult) => {
            if(err){
                return res.status(500).json("server error");
            }
            
            if(adminResult.length > 0) {
                return res.status(200).json({
                    message: "login successfully as admin", 
                    user: adminResult[0],
                    role: 'admin'
                });
            }
            
            // If not found in either table
            return res.status(401).json({message: "Invalid phone or password"});
        });
    });
});

module.exports = Router