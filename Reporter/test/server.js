var express = require('express');

var app = express();

app.get('/', function(req, res) {
    res.send("this is working");
});
app.get('/wines/:id', function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
});

app.listen(3000);
console.log('Listening on port 3000...');