const express = require("express")
const routes = express.Router()
const jwt = require('jsonwebtoken')
const db = require("../config/db")
const bcrypt = require('bcrypt')

const checkEmailExists = async (Email) => {
    try {
        db.query('SELECT `email` FROM `users` WHERE email= ? ', [Email], (err, result) => {
            if (err) {
                console.log("Error in executing the sql statement in checkEmailExists function", err)
                return
            } else {
                console.log(result)
                if (result.length > 0) {
                    return { status: true, result }
                } else {
                    return { status: false, result }
                }
            }
        })
    } catch (err) {
        console.log('Error in the checkEmailExists Function', err)
    }
}
const createNewUser = async (Email, Password) => {
    try {
        db.query('INSERT INTO `users`(`email`,`password`) VALUES( ? , ?) ', [Email, Password], (err, result) => {
            if (err) {
                console.log("Error in Executing the sql statement in createNewUSer Function", err)
            } else {
                console.log(result)
            }
        })
    } catch (error) {
        console.log("Error in teh createNewUser function", error)
    }
}
routes.post("/register", async (req, res) => {

    const { email, password } = req.body
    if (email.trim().length > 3 && password.trim().length > 3) {
        email.trim()
        password.trim()
        const checkEmailExistsResult = await checkEmailExists(email)
        console.log(  checkEmailExistsResult)
       /* if (checkEmailExistsResult.status) {
            //it means the user already exists
            res.status(201).json({ status: false, msg: "Email Already Used" })
        } else {
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)
            createNewUser(email, hashedPassword)
        } */
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
