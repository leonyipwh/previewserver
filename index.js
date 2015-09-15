var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 3000));

var basicAuth = require('basic-auth');

var auth = function (req, res, next) {
  function unauthorized(res) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.send(401);
  };

  var user = basicAuth(req);

  if (!user || !user.name || !user.pass) {
    return unauthorized(res);
  };

  if (user.name === 'admin' && user.pass === 'admin') {
    return next();
  } else {
    return unauthorized(res);
  };
};

// app.get('/', auth, function (req, res) {
//   app.use(express.static(__dirname + '/public/book'));
//   res.sendFile(__dirname + "/public/book/index.html");
// });

app.use(express.static(__dirname + '/public/'));

// app.get('/sin', function (req, res) {
//   res.sendFile(__dirname + "/public/book/sin/index.html");
// });
//
// app.get('/hk', function (req, res) {
//   res.sendFile(__dirname + "/public/book/hk/index.html");
// });
//
// app.get('/test', function (req, res) {
//   res.sendFile(__dirname + "/public/book/testSize/index.html");
// });

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});
