function socketServer(target){
	
	
	var io= require('socket.io')(target);

	var rooms= new Map();
	// users is to make sure each time user only access through one socket, no sync.
	// phase 2?
	var users = new Map();
	/// id would be string , such as "room310"
    function isRoomEmpty(id){
		return rooms.has(id);
		//return false;
	}
	//var rooms = new Map();

	//var users = new Map();
	
	io.on('connection',function(socket){
		//connection management;
		console.log("new conn");
		socket.on('disconnect',function(){
			console.log('disconnect');
		});
		socket.on('msg',function(msg){
			io.emit('msg',msg);
		});
		socket.on('join',function(data){
			if(!isRoomEmpty(data)){
				console.log(data);
				io.to(data).emit('msg','new join');
				
			}
		})
	});
	

	return this;
	
	
};


module.exports=socketServer;