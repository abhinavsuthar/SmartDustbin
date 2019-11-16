const jwt = require('jsonwebtoken')
const config = require('./../config')

const login = (req, res, dbs) => {
  let username = req.body.username
  let password = req.body.password
  const collection = dbs.production.collection('users')
  const query = {username: username, password: password}
  collection.findOne(query)
      .then(document => {
        if (username && password) {
          if (document && username === document.username && password === document.password) {
            let token = jwt.sign({username: username, role: document.role, locations: document.locations}, config.secret, {expiresIn: '24h'})
            res.json({success: true, message: 'Authentication successful!', token: token})
          } else {
            res.status(401).json({success: false, message: 'Incorrect username or password'})
          }
        } else {
          res.status(401).json({success: false, message: 'Authentication failed! Please check the request'})
        }
      })
      .catch(error => {
        throw error
      })
}

module.exports = {login}
