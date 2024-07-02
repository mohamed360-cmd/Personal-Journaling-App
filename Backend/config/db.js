const mysql = require("mysql2")
const connection = mysql.createConnection({
    host : "localhost",
    user : "",
    password : "",
    database : ""
})
connection.connect((err)=>{
    if(err){
        console.log("An Error Has Occcured in Connecting to The Database",err)
    }else{
        console.log("Successfuly Connected to the Databse")
    }
})
module.exports = connection