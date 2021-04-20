const jwt = require('jsonwebtoken')

function generateToken(user){
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "300s"})
}

function authenticateJWT(req, res, next){
    // const access_token = req.cookies.access_token
    console.log("inside authenticate JWT")
    let access_token = ''
    const bearerHeader = req.headers.authorization
    if(bearerHeader !== undefined){
        const bearer = bearerHeader.split(' ')
        access_token = bearer[1]

    }

    console.log(access_token)
    if(!access_token){
        res.json('token not found')
        return
    }
    jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, function(err, user){
        if(err){
            res.sendStatus(403)
            return
        }
        req.user = user
        console.log("access token verified")
        next()
    })
}
function checkJWT(req, res, next){
    const access_token = req.cookies.access_token
    if(access_token){
        jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET, function(err, user){
            if(err){
                next()
                return
            }
            req.user = user
            next()
        })
    } else {
        next()
    }
}

module.exports = {generateToken, authenticateJWT, checkJWT}