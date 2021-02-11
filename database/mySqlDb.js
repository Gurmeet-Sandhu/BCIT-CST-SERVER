const mysql =  require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host : process.env.DB_HOST ,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB
});

function connect(callback){
    conn.connect(function(err){
        callback(err)
    })
}

const createStudentInfo = (data, callback) => {
    conn.query("INSERT INTO student_info Set ?", data, callback)
}

const readDataAsCSV = (callback) => {
    conn.query("SELECT * FROM student_info", callback)
}
module.exports = {connect, createStudentInfo, readDataAsCSV}