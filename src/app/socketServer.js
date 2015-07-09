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
			io.to(socket.id).emit('room_msg',{content:"one has leaved the room"});
		});
		socket.on('room_msg',function(msg){
			console.log("received:"+msg.roomId);
			io.to(msg.roomId).emit('room_msg',msg);
		});
		socket.on('room_join',function(data){

			if(!isRoomEmpty(data.roomId)){
				//console.log(data);
				socket.join(data.roomId);
				io.to(data.roomId).emit('room_msg',{content:data.userId + " has joined the room"});
			}else{
				createRoom(data.roomId);
				socket.join(data.roomId);
				io.to(data.roomId).emit('room_msg',{content:data.userId + " has joined the room"});
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
};


module.exports=socketServer;
