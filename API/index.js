var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var spawn = require("child_process").spawn;
var process = spawn('python',["script.py"]);
 var textChunk="hello"
 var func = function()
 {
   process.stdout.on('data',function(chunk){

    textChunk = chunk.toString('utf8');// buffer to string

    console.log(textChunk);
    });
 }
app.get('/about',function(req,res){
   
   
    func();
    res.write(textChunk); 
    res.end();
    
});
// app
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.post('/putback',function(req,res){
    console.log("Got");
    
    var i = 0;
    
    while(req.body[i] != undefined)
    {
        console.log(req.body[i].latitude);
        i++;
    }

    res.write("Response received");
    res.end();
})








app.listen(7070);