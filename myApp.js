let express = require('express');
let app = express();
console.log("Hello World");
/*
app.get("/",(req, res)=>{
  res.send("Hello Express");
});
*/
app.use( function(req,res, next) {
  console.log(req.method + " " + req.path + " - " + req.ip);
  next();
}); 
app.get('/now', function(req,res, next){
  req.time = new Date().toString();
  next();
}, function(req , res){
  res.send({time:req.time});
});
app.get("/",(req, res)=>{
  res.sendFile(__dirname + "/views/index.html");
});
app.get("/:word/echo", (req, res) => {
  const { word } = req.params;
  res.json({
    echo: word
  });
});
app.use("/public",express.static(__dirname +"/public"));

app.get("/name", function(req, res) {
  var firstName = req.query.first;
  var lastName = req.query.last;
  // OR you can destructure and rename the keys
  var { first: firstName, last: lastName } = req.query;
  // Use template literals to form a formatted string
  res.json({
    name: `${firstName} ${lastName}`
  });
});
app.get("/json", (req, res)=>{
  const mySecret = process.env['MESSAGE_STYLE']
  if(mySecret == "uppercase") {
    res.json({message: "HELLO JSON"});
  } else {
    res.json({message: "Hello json"});
  }
});




































 module.exports = app;
