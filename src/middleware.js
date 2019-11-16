const jwt = require('jsonwebtoken')
const config = require('./config')

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']
  if (token) {
    //Remove Bearer from string
    if (token.startsWith('Bearer ')) token = token.slice(7, token.length)
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({success: false, message: 'Token is not valid'})
      } else {
        req.user = decoded
        next()
      }
    })
  } else {
    return res.status(401).json({success: false, message: 'Auth token is not supplied'})
  }
}

module.exports = {
  verifyToken
}
