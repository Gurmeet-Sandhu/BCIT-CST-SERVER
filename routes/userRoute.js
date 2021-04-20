const express = require('express');
const fastCsv = require('fast-csv');
const fs = require('fs');

const router = express.Router();

module.exports = function(db){

    // router.post('/createStudentInfo', (req, res) => {

    //     console.log(req.body)
    //     const studentData = {
    //         first_name : req.body.firstName,
    //         last_name  : req.body.lastName,
    //         student_no : req.body.studentNo,
    //         bcit_email : req.body.bcitEmail,
    //         student_set : req.body.studentSet,
    //         first_choice : req.body.firstChoice,
    //         second_choice : req.body.secondChoice,
    //         third_choice : req.body.thirdChoice,
    //         fourth_choice : req.body.fourthChoice,
    //         fifth_choice : req.body.fifthChoice,
    //         sixth_choice : req.body.sixthChoice,
    //     }

    //     db.createStudentInfo(studentData, (err, result) => {
    //         if(err){
    //             res.json(err)
    //             return
    //         }
    //         res.json("Data has been entered")
    //     })
    // })

    router.get('/getSelectionId/:select', (req, res) => {
        console.log(req.params.select)
        db.getSelectionId(req.params.select, (err, result) => {
            if(err){
                res.json(err)
                return
            }
            console.log(result[0].id)
            res.json({
                id : result[0].id
            })
        })
    })

    router.post('/createStudentInfo', (req, res) => {

        console.log(req.body)
        const studentData = {
            first_name : req.body.firstName,
            last_name  : req.body.lastName,
            student_no : req.body.studentNo,
            bcit_email : req.body.bcitEmail,
            student_set : req.body.studentSet,
        }

        const selectionList = req.body.selectionList;

        db.createStudent(studentData, (err, result1) => {
            if(err){
                res.json(err)
                return
            }
            const studentOptionArray = [];

            for(let key in selectionList){
                let studentOption = {
                    student_id : result1.insertId,
                    option_id : selectionList[key],
                    priority : key
                }
                studentOptionArray.push(studentOption);
            }
            console.log(studentOptionArray)
            db.createStudentOptions(studentOptionArray, (err, result2) => {
                if(err){
                    res.json(err)
                    return
                }
                res.json("student options has been entered");
            })
        })
    })
    return router;
}