const express = require('express');

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())

module.exports = function(db){

    app.get('/', (req,res) =>{
        res.json("Hello world");
    })

    const userRoute = require('./routes/userRoute')(db)
    app.use('/user', userRoute);

    const adminRoute = require('./routes/adminRoute')(db)
    app.use('/admin', adminRoute);

    return app
}