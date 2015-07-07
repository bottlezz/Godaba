function socketServer(target){
	
	
	var io= require('socket.io')(target);
	// will move the room management component out later as a saperated service.
	var rooms= new Set();
	// users is to make sure each time user only access through one socket, no sync.
	// phase 2?
	var users = new Map();
	/// id would be string , such as "room310"
    function isRoomEmpty(id){
		return rooms.has(id);
		//return false;
	}
	function createRoom(id){
		rooms.add(id);
	}
	function removeRoom(id){
		rooms.delete(id);
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
			console.log("received:"+msg);
			io.emit('msg',msg);
		});
		socket.on('room_join',function(data){
			if(!isRoomEmpty(data)){
				console.log(data);
				io.to(data).emit('msg','new join');	
			}
		});
		socket.on('room_create',function(id){
			if(!isRoomEmpty(id)){
				createRoom(id);
			}
		});
		socket.on('room_exsist',function(id){
			return isRoomEmpty(id);
		});
	});
	

	return this;
	
	
};


module.exports=socketServer;