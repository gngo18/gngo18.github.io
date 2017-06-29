//Import our packages
var express= require('express')
var app= express();
var http= require('http').Server(app);

//Serve up our static files bruhhhhhhhh

app.use(express.static(__dirname+"/public"));

//we are telling our app to use the static folder(public) that express prepares for us

//Serve Up our index.html file bruhhhhh

app.get('/', function(req, res){
	res.sendFile(__dirname+'/index.html');
});

//Run on a local port
http.listen(process.env.PORT || 3000, function(){
	console.log("Listening on *:3000")
})