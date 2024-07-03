const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password: '12345',
    database :'myJournal'
})
connection.connect((err)=>{
    if(err){
        console.log("Error In Connecting to the database",err)
    }else{
        console.log("Successfuly Connected to the database")
    }
})
module.exports = connection;