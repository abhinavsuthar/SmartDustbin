const express = require('express')
const bodyParser = require('body-parser')
const history = require('connect-history-api-fallback')
const initializeDatabases = require('./dbs')
const routes = require('./routes')

const app = express()
const port = process.env.PORT || 8000
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH, OPTIONS')
  next()
})*/
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(history())
app.use(express.static(__dirname + '/../ui/dist'))


initializeDatabases().then(dbs => {
  // Initialize the application once database connections are ready.
  routes(app, dbs).listen(port, () => console.log(`Server is listening on port: ${port}`))
}).catch(err => {
  console.error('Failed to make all database connections!')
  console.error(err)
  process.exit(1)
})
