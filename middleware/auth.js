const jwt = require('jsonwebtoken')
const jwtSecret = "secret"

module.exports = function(req, res, next){
    // Get token from the header
    const token = req.header('x-auth-token')

    // check if token exists
    if(!token){
        return res.status(401).json({msg: "No token, access denied!!"})
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if(err){
            res.status(401).json({msg: 'Token not valid!'})
        }

        req.user = decoded.user
        next()
    })
}