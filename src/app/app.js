var dataStore=  require("./dataStore");
var httpServer = require("./httpServer");
var httpHandler=httpServer.expressApp.listen(process.env.PORT || 8000, function(){
	var host=httpHandler.address().address;
	var port=httpHandler.address().port;
  console.log('godaba is listening at http://%s:%s', host, port);
});


var socketServer =new require('./socketServer')(httpHandler);
httpServer.dataStore = dataStore;
socketServer.setDataStore(dataStore);
