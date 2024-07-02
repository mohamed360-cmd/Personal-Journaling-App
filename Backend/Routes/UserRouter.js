const express = require("express")
const routes = express.Router()
const jwt = require('jsonwebtoken')
routes.post("/register",(req,res)=>{
    /*
    1.Check is the user exist
    if the user exits return an error message 
    else save the user to the database encroyr the password then  return an success message and ask the user tologin 
    */
})
routes.post("/login",(req,res)=>{
    /*
    1.Check is the user exist
    if the user exits take the users password ,decrytpt it an compare teh password 
    if they match return a JWT token containg users information and a success message
    else if the password is not correct retunr an error message 
    */
})
module.exports = routes
