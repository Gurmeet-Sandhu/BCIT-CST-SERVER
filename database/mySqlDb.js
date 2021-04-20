const e = require('express');
const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB
});

function connect(callback) {
    conn.connect(function (err) {
        callback(err)
    })
}

// const dbConfig = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB
// }
// let conn;
// function handleDisconnect(callback) {
//     conn = mysql.createConnection(dbConfig);  // Recreate the connection, since the old one cannot be reused.
//     conn.connect( function onConnect(err) {   // The server is either down
//         if (err) {                                  // or restarting (takes a while sometimes).
//             console.log('error when connecting to db:', err);
//             setTimeout(handleDisconnect, 10000);    // We introduce a delay before attempting to reconnect,
//         }                                           // to avoid a hot loop, and to allow our node script to
//     });                                             // process asynchronous requests in the meantime.
//                                                     // If you're also serving http, display a 503 error.
//     conn.on('error', function onError(err) {
//         console.log('db error', err);
//         if (err.code == 'PROTOCOL_CONNECTION_LOST') {   // Connection to the MySQL server is usually
//             handleDisconnect();                         // lost due to either server restart, or a
//         } else {                                        // connnection idle timeout (the wait_timeout
//             throw err;                                  // server variable configures this)
//         }
//     });
// }

const getAdmin = (admin, callback) => {
    conn.query("SELECT * FROM admins WHERE username = ? ", [admin.username], callback)
}

const createAdmin = (admin, callback) => {
    conn.query("INSERT INTO admins SET ?", admin, callback)
}

// const createStudentInfo = (data, callback) => {
//     conn.query("INSERT INTO student_info SET ?", data, callback)
// }

const createStudent = (data, callback) => {
    conn.query("INSERT INTO student SET ?", data, callback)
}

const readDataAsCSV = (callback) => {
    conn.query(`SELECT t.first_name, t.last_name, t.student_no, t.bcit_email,
                MAX(CASE WHEN t.priority = 'one' 
                THEN t.selection END) AS First_Choice,
                MAX(CASE WHEN t.priority = 'two' 
                THEN selection END) AS Second_Choice,
                MAX(CASE WHEN t.priority = 'three' 
                THEN selection END) AS Third_Choice,
                MAX(CASE WHEN t.priority = 'four' 
                THEN selection END) As Fourth_Choice,
                MAX(CASE WHEN t.priority = 'five' 
                THEN selection END) AS Fifth_Choice,
                MAX(CASE WHEN t.priority = 'six' 
                THEN selection END) As Sixth_Choice
                FROM 
                (SELECT student.id, student.first_name, student.last_name, student.student_no, student.bcit_email, student.student_set, options.selection, student_options.priority 
                               FROM student_options 
                               INNER JOIN student ON student.id = student_options.student_id
                               INNER JOIN options ON options.id = student_options.option_id) AS t
                GROUP BY t.first_name, t.last_name, t.student_no, t.bcit_email`, callback)
}

const createStudentOptions = (studentOptionArray, callback) => {
    let query = `INSERT INTO student_options(student_id, option_id, priority) VALUES `;

    for (let i = 0; i < studentOptionArray.length; i++) {
        query += `(${studentOptionArray[i].student_id},${studentOptionArray[i].option_id},'${studentOptionArray[i].priority}')`;
        if (i < studentOptionArray.length - 1) {
            query += ','
        } else {
            query += ';'
        }
    }

    conn.query(query, callback)
}

const getSelectionId = (selection, callback) => {
    conn.query("SELECT * FROM options WHERE selection = ? ", [selection], callback)
}

module.exports = { connect, createStudent, readDataAsCSV, getAdmin, createAdmin, getSelectionId, createStudentOptions }