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
    const  { phone, password} = req.body;
    const sql = "SELECT * FROM Patient WHERE phone=? AND password=?";
    conn.query(sql, [phone, password], (err, result) => {
        if(err){
            res.status(500).json("server error")
        }
        res.status(200).json({message: "login sucessfully", user: result})  
    })
})

module.exports = Router