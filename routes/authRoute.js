const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

module.exports = function (db, jwt) {

    router.post("/signup", (req, res) => {
        const admin = req.body

        db.getAdmin(admin, (err, user) => {
            if (err) {
                res.json("error occured retrieving the admin")
                return
            }

            if (user.length) {
                res.json("user wiht this username already exist!!")
                return
            }


            bcrypt.hash(admin.password, 10, (err, hash_password) => {
                if (err) {
                    res.json("error while hashing")
                    return
                }
                db.createAdmin({ ...admin, password: hash_password }, (err, result) => {
                    if (err) {
                        res.json(`error while creating user : ${err}`)
                        return
                    }
                    res.json("admin has been created")
                })
            })
        })
    })


    router.post("/login", (req, res) => {
        const admin = req.body
        
        console.log(admin)

        db.getAdmin(admin, (err, user) => {
            if (err) {
                res.json("error occured retrieving the admin")
                return
            }

            if (!user.length) {
                res.json("no user found with this username")
                return
            }

            bcrypt.compare(admin.password, user[0].password, (err, result) => {
                if (err || !result) {
                    res.json("username password does not match")
                    return
                }
                const token = jwt.generateToken({ userId: user[0].id, userName: user[0].first_name })
                // res.cookie('access_token', token)
                res.json({token})
            })
        })
    })

    return router;
}