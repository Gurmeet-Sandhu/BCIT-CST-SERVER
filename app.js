const express = require('express');
const cookieParser = require('cookie-parser')
const path = require('path');

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'build')));

module.exports = function (db, jwt) {

    const authRoute = require('./routes/authRoute')(db, jwt)
    app.use('/auth', authRoute);

    const userRoute = require('./routes/userRoute')(db)
    app.use('/user', userRoute);

    const adminRoute = require('./routes/adminRoute')(db, jwt)
    app.use('/admin', adminRoute);

    app.get('/*', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
      });

    return app
}