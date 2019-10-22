const express = require('express');
const bodyParser = require('body-parser');
const middleware = require('./middleware');
const auth_handlers = require('./api/authentication')

const index = (req, res) => {
  res.json({
    success: true,
    message: 'Index page: ' + JSON.stringify(req.decoded)
  });
}

// Starting point of the server
function main() {
  let app = express(); // Export app for other routes to use
  const port = process.env.PORT || 8000;
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());

  // Routes & Handlers
  app.use('/auth', auth_handlers);
  app.get('/', middleware.checkToken, index);
  app.listen(port, () => console.log(`Server is listening on port: ${port}`));
}

console.clear();
main();

// module.exports = main.app;
