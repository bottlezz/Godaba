var httpServer = require("./httpServer").listen(8000, function(){
	var host=httpServer.address().address;
	var port= httpServer.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

var socketServer =new require('./socketServer')(httpServer);
