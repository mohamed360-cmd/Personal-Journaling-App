const express = require("express")
const routes = express.Router()
const jwt = require('jsonwebtoken')
const db = require("../config/db")
const bcrypt = require('bcrypt')
const query = (queryString,params)=>{
    return new Promise((resolve,reject)=>{
        db.query(queryString,params,(err,result)=>{
            if(err){
                reject(err)
            }else{
                resolve(result)
            }
        })
    })
}
const checkEmailExists = async (Email) => {
    try {
        const sql = 'SELECT `email` FROM `users` WHERE email= ?'
        const sqlArguments = [Email]
        const result = await query(sql,sqlArguments)
        if(result.length > 0){
            return ({status : true, result})
        }else{
            return ({status : false,result : null})
        }
    } catch (err) {
        console.log('Error in the checkEmailExists Function', err)
    }
}
const createNewUser = async (Email, Password) => {
    try {
        const sqlStatement = 'INSERT INTO `users`(`email`,`user_password`) VALUES( ? , ?) '
        const sqlArguments = [Email, Password]
        const result = await query(sqlStatement,sqlArguments)
        return result
    } catch (error) {
        console.log("Error in teh createNewUser function", error)
    }
}
routes.post("/register", async (req, res) => {

    const { email, password } = req.body
    if (email.trim().length > 3 && password.trim().length > 3) {
        email.trim()
        password.trim()
        const resultEmailExist =  await checkEmailExists(email)
       if (resultEmailExist.status) {
            //it means the user already exists
            res.status(201).json({ status: false, msg: "Email Already Used" })
        } else {
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)
           const resultCreateNewUser = await createNewUser(email, hashedPassword)
           res.status(200).json({status : true,msg : 'Account Successfuly Created Please Login'})
        } 
    } else {
        res.status(201).json({ status: false, msg: 'Data Lenght too Short' })
    }
})
routes.post("/login", (req, res) => {
    /*
    1.Check is the user exist
    if the user exits take the users password ,decrytpt it an compare teh password 
    if they match return a JWT token containg users information and a success message
    else if the password is not correct retunr an error message 
    */
})
module.exports = routes
