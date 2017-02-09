var express = require('express');
var db_driver = require('./db.js');
var app = express();

app.get('/apps/ezt/api/columns', function(req, resp){
    resp.writeHead(200, {"Content-Type": "application/json"});
    db_driver.columns(req.query.type, function(data){
        resp.end(JSON.stringify(data));
    });
});

app.get('/apps/ezt/api/media', function(req, resp){
    resp.writeHead(200, {"Content-Type": "application/json"});
    db_driver.media(req.query.type, req.query.column, function(data){
        resp.end(JSON.stringify(data));
    });
});

app.listen(10001);
