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
            const sqlStatement = 'SELECT `user_password` , `id` FROM users WHERE email= ?'
            const sqlArguments = [resultEmailExist.result[0].email]
            const QueryResult = await query(sqlStatement, sqlArguments)
            const hashedPassword = QueryResult[0].user_password
            const isPasswordCorrect = await bcrypt.compare(password, hashedPassword)
            if (isPasswordCorrect) {
                //Generate JWT token and send back
                const userId = QueryResult[0].id
                const jwtToken = jwt.sign({email,userId},process.env.SECRET_KEY,{expiresIn : '1h'})
                res.status(200).json({status : true ,jwtToken,userEmail : email})
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
routes.get('/userverifier',async (req,res)=>{
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader ){
            console.log("p",authorizationHeader) 
            res.json({status : false, msg : 'no Authorization'})
        }else{
            try {
                const token = authorizationHeader.replace('bearer ', '')
                const result = await checkJwtToken(token)
console.log(result)
                res.json(result)
            } catch (error) {
                console.log("Error in the userverifier Route",error)
            }
        }
})
routes.post('/addJournal',async(req,res)=>{
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader ){
        console.log("p",authorizationHeader) 
        res.json({status : false, msg : 'no Authorization'})
    }else{
        try {
            const token = authorizationHeader.replace('bearer ', '')
            const result = await checkJwtToken(token.trim())
            if(result.status){
                const {journalDate,Title,content,Category} = req.body
                const userId = result.decoded.userId
                const sql = 'INSERT INTO `journals` (`user_id`,`title`,`category`,`content`,`JournalDate`) VALUES(?,?,?,?,?) '
                const sqlArguments = [userId,Title,Category,content,journalDate]
                const result2 = await query(sql,sqlArguments) // the result from the insert journal operation
                res.json({status : true ,msg : 'Successefuly Added Journal'})
            }else{
                res.json({status : false,msg : 'JWT token Not accepted'})
            }
        } catch (error) {
            console.log("Error in the addJournal Route",error)
        }
    }
})
routes.get('/getJournals',async(req,res)=>{
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader ){
        console.log("p",authorizationHeader) 
        res.json({status : false, msg : 'no Authorization'})
    }else{
        try {
            const token = authorizationHeader.replace('bearer ', '')
            const result = await checkJwtToken(token.trim())
            if (result.status){
                const userId = result.decoded.userId
                const sql = 'SELECT * FROM `journals` WHERE `user_Id` = ?';
                const sqlArguments = [userId]
                const QueryResult = await query(sql,sqlArguments)
                res.json({status : true ,result : QueryResult})
            }else{
                res.json({status : false,msg : 'JWT token Not accepted'})
            }
        } catch (error) {
            console.log("Error in the getJournals Route",error)
        }
    }
})
routes.post('/updateJournal',async(req,res)=>{
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader ){
        console.log("p",authorizationHeader) 
        res.json({status : false, msg : 'no Authorization'})
    }else{
        try {
            const token = authorizationHeader.replace('bearer ', '')
            console.log(token)
            const result = await checkJwtToken(token.trim())
            if(result.status){
                const {JournalID,journalDate,Title,content,Category} = req.body
                
                const userId = result.decoded.userId
                const sql = 'UPDATE  `journals` SET  `title` = ? , `category` = ? ,`content` = ? ,`JournalDate` = ?  WHERE `id`= ? '
                const sqlArguments = [Title,Category,content,journalDate,JournalID]
                const result2 = await query(sql,sqlArguments) // the result from the update journal operation
                res.json({status : true ,msg : 'Successefuly updated Journal'})
            }else{
                res.json({status : false,msg : 'JWT token Not accepted'})
            }
        } catch (error) {
            console.log("Error in the updateJournal Route",error)
        }
    }
})
routes.post('/resetpassword',async(req,res)=>{
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader ){
        console.log("p",authorizationHeader) 
        res.json({status : false, msg : 'no Authorization'})
    }else{
        try {
            const token = authorizationHeader.replace('bearer ', '')
            const result = await checkJwtToken(token.trim())
            if(result.status){
                const {email,password} = req.body
                const salt = await bcrypt.genSalt(12)
                const hashedPassword = await bcrypt.hash(password,salt)
                const sql = 'UPDATE `users` SET `user_password` = ? WHERE `email` = ? '
                const sqlArguments = [hashedPassword,email]
                const result2 = await query(sql,sqlArguments)
                res.json({status : true ,msg : 'Successefuly Updated Password'})
            }else{
                res.json({status : false,msg : 'JWT token Not accepted'})
            }
        } catch (error) {
            console.log("Error in the resetpassword Route",error)
        }
    }

})
routes.post('/deleteJournal',async(req,res)=>{
    const authorizationHeader = req.headers.authorization
    if(!authorizationHeader ){
        console.log("p",authorizationHeader) 
        res.json({status : false, msg : 'no Authorization'})
    }else{
        try {
            const token = authorizationHeader.replace('bearer ', '')
            const result = await checkJwtToken(token.trim())
            if(result.status){
                const {journalID} = req.body
                const sql = 'DELETE FROM `journals`  WHERE `id` = ? '
                const sqlArguments = [journalID]
                const result2 = await query(sql,sqlArguments)
                res.json({status : true ,msg : 'Successefuly Deleted Journal'})
            }else{
                res.json({status : false,msg : 'JWT token Not accepted'})
            }
        } catch (error) {
            console.log("Error in the deleteJournal Route",error)
        }
    }

})
module.exports = routes
