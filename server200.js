var express = require("express"),
    app = express(),
    fs = require('fs'),
    http = require('http'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    methodOverride = require('method-override'),
    //hostname = process.env.HOSTNAME || '200.145.241.90',
    hostname = process.env.HOSTNAME || '10.0.0.105',
    portHttp = parseInt(process.env.PORT, 10) || 8001;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
  next();
});

app.use(methodOverride());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static(__dirname + '/www'));

app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
}));

app.get("/", function (req, res) {
    res.redirect("/index.html");
});

//console.log("Simple server listening at http://" + hostname + ":" + portHttp);

var httpServer = http.createServer(app);

httpServer.listen(portHttp, hostname);
