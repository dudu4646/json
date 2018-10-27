var express=require('express');
var bodyParser = require("body-parser"); 
var users = require('./user');

var app = express();
app.use(express.static("./main"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/checkData',(req,res)=>{
    console.log("checkData");
    var user=req.body;
    var num=users.addUser(user.name,user.age,user.gendare,user.country);
    console.log(num);
    if (num==-1){
        res.status(400);
        res.send("invalid user");
    }
    if(num==0){
        res.status(201);
        res.send(users.printAll());
    }
    if (num ==1){
        res.status(400);
        res.send("name allready taken");
    }
});


app.listen(process.env.PORT||3500, 
    ()=>{console.log("server listening");});

