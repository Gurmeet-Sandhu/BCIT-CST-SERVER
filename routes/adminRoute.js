const express = require('express');
const fastCsv = require('fast-csv');
const fs = require('fs');


const router = express.Router();

module.exports = function(db, jwt){

    router.get('/readDataAsCsv', jwt.authenticateJWT, (req, res) => {
        console.log('inside readdataascsv')
        db.readDataAsCSV((err, data) => {
            if(err){
                res.json(err)
                return
            }
            console.log(data)
            const ws = fs.createWriteStream("studentInfo.csv");
            const jsonData = JSON.parse(JSON.stringify(data));
            console.log("jsonData", jsonData);

            fastCsv
            .write(jsonData, { headers: true })
            .on("finish", function() {
                console.log("Write to studentInfo.csv successfully!");
            })
            .pipe(ws)
            .on("close", () => {
                res.download("./studentInfo.csv","studentInfo.csv", (err) => {
                    if(err){
                        res.json(err)
                        return
                    }
    
                    fs.unlink("./studentInfo.csv", (err) => {
                        if (err) {
                          console.error(err)
                          return
                        }
                    })
                });
            });
        })
    })
    return router;
}