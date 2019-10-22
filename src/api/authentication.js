const jwt = require('jsonwebtoken');
const config = require('./../config');
const express = require('express');
const middleware = require('./../middleware');
const MongoClient = require('mongodb').MongoClient
const router = express.Router();
const url = 'mongodb://localhost:27017'


const login = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // For the given username fetch user from DB
  let mockedUsername = 'admin';
  let mockedPassword = 'password';

  const _db = await MongoClient.connect(url, {useNewUrlParser: true, 'useUnifiedTopology': true})
      .catch(error => {
        throw error
      })
  const db = _db.db('smart_dustbin')
  const collection = db.collection('users')

  const query = {username: username, password: password}
  const document = await collection.findOne(query)

  if (username && password) {
    if (document && username === document.username && password === document.password) {
      let token = jwt.sign({username: username},
          config.secret,
          {expiresIn: '24h'} // expires in 24 hours
      );
      // return the JWT token for the future API calls
      await res.json({
        success: true,
        message: 'Authentication successful!',
        token: token
      });
    } else {
      res.status(403).json({
        success: false,
        message: 'Incorrect username or password'
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request'
    });
  }
}


router.post('/login', login);

module.exports = router
