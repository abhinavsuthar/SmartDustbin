const middleware = require('./../middleware')
const auth = require('./../api/authentication')
const dustbin = require('./../api/dustbin')

const index = (req, res) => {
  res.json({success: true, message: 'Index page: ' + JSON.stringify(req.user)})
}

module.exports = function (app, dbs) {

  app.get('/test', middleware.verifyToken, index)
  app.post('/auth/login', (req, res) => auth.login(req, res, dbs))
  app.post('/add-dustbin', middleware.verifyToken, (req, res) => dustbin.addNewDustbin(req, res, dbs))
  app.post('/get-dustbins', middleware.verifyToken, (req, res) => dustbin.getDustbins(req, res, dbs))
  app.post('/update-dustbin-level', middleware.verifyToken, (req, res) => dustbin.updateDustbinLevel(req, res, dbs))

  return app
}
