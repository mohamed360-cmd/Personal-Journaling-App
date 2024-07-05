require('dotenv').config()
const express = require("express")
const routes = express.Router()
const jwt = require('jsonwebtoken')
const db = require("../config/db")
const bcrypt = require('bcrypt')
const query = (queryString, params) => {
    return new Promise((resolve, reject) => {
        db.query(queryString, params, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
}
//Check jtw token
const checkJwtToken = (jwt_token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(jwt_token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    resolve({ status: false, msg: 'expired' });
                } else if (err.name === "JsonWebTokenError") {
                    resolve({ status: false, msg: 'Token_Error' });
                } else {
                    resolve({ status: false, msg: 'Token_Invalid' });
                }
            } else {
                console.log(decoded);
                resolve({ status: true, decoded });
            }
        });
    });
};

const checkEmailExists = async (Email) => {
    try {
        const sql = 'SELECT `email` FROM `users` WHERE email= ?'
        const sqlArguments = [Email]
        const result = await query(sql, sqlArguments)
        if (result.length > 0) {
            return ({ status: true, result })
        } else {
            return ({ status: false, result: null })
        }
    } catch (err) {
        console.log('Error in the checkEmailExists Function', err)
    }
}
const createNewUser = async (Email, Password) => {
    try {
        const sqlStatement = 'INSERT INTO `users`(`email`,`user_password`) VALUES( ? , ?) '
        const sqlArguments = [Email, Password]
        const result = await query(sqlStatement, sqlArguments)
        return result
    } catch (error) {
        console.log("Error in teh createNewUser function", error)
    }
}
routes.post("/register", async (req, res) => {

    const { email, password } = req.body
    if(!email && !password){
        res.json({status : false,msg :'Email And password Required  '})
    }else{
    if (email.trim().length > 3 && password.trim().length > 3) {
        email.trim()
        password.trim()
        const resultEmailExist = await checkEmailExists(email)
        if (resultEmailExist.status) {
            //it means the user already exists
            res.status(201).json({ status: false, msg: "Email Already Used" })
        } else {
            const salt = await bcrypt.genSalt(12)
            const hashedPassword = await bcrypt.hash(password, salt)
            const resultCreateNewUser = await createNewUser(email, hashedPassword)
            res.status(200).json({ status: true, msg: 'Account Successfuly Created Please Login' })
        }
    } else {
        res.status(201).json({ status: false, msg: 'Data Lenght too Short' })
    }
}
})
routes.post("/login", async (req, res) => {
    const { email, password } = req.body
    if(!email && !password){
        res.json({status : false,msg :'Email And password Required  '})
    }else{
    if (email.trim().length > 3 && password.trim().length > 3) {
        email.trim()
        password.trim()
        const resultEmailExist = await checkEmailExists(email)
        if (resultEmailExist.status) {
            const sqlStatement = 'SELECT `user_password` FROM users WHERE email= ?'
            const sqlArguments = [resultEmailExist.result[0].email]
            const passwordQueryResult = await query(sqlStatement, sqlArguments)
            const hashedPassword = passwordQueryResult[0].user_password
            const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
            if (isPasswordCorrect) {
                //Generate JWT token and send back
                const jwtToken = jwt.sign({email},process.env.SECRET_KEY,{expiresIn : '1min'})
                console.log(jwtToken)
                res.status(200).json({status : true ,jwtToken})
            } else {
                res.status(201).json({ status: false, msg: "Wrong Email or Password" })
            }
        } else {
            res.status(201).json({ status: false, msg: "Wrong Email or Password" })
        }
    } else {
        res.status(201).json({ status: false, msg: 'Data Lenght too Short' })
    }
    }
})
routes.post('/test',async (req,res)=>{
    const {token} = req.body
    try {
    const result = await checkJwtToken(token)
    console.log(result)
    res.json(result)
    } catch (error) {
        console.log("error in test",error)
    }

})
module.exports = routes
