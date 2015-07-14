function socketServer(target){


	var io= require('socket.io')(target);
	// will move the room management component out later as a saperated service.
	var rooms= new Map();
	// users is to make sure each time user only access through one socket, no sync.
	// phase 2?
	var users = new Map();
	/// id would be string , such as "room310"
    function isRoomEmpty(id){
		return rooms.has(id);
		//return false;
	}
	//TODO: room storage data strucutre
	function createRoom(id){
		rooms.set(id,{count:0});
	}
	function removeRoom(id){
		rooms.delete(id);
	}
	io.on('connection',function(socket){
		//connection management;

		//console.log("new conn");
		socket.on('disconnect',function(){
			console.log('disconnect');
			var user=users.get(this.id);
			if(user!=null){

				io.to(user.roomId).emit('room_msg',{content:user.userId+" has left the room"});
				var room=rooms.get(user.roomId);

				users.delete(this.id);

			}
		});
		socket.on('room_msg',function(msg){
			console.log("received:"+msg.roomId);
			io.to(msg.roomId).emit('room_msg',msg);
		});
		socket.on('room_join',function(data){
			users.set(this.id,{userId:data.userId,roomId:data.roomId});
			if(!isRoomEmpty(data.roomId)){
				//console.log(data);
				socket.join(data.roomId);
				io.to(data.roomId).emit('room_msg',{content:data.userId + " has joined the room"});
			}else{
				createRoom(data.roomId);
				socket.join(data.roomId);
				io.to(data.roomId).emit('room_msg',{content:data.userId + " has joined the room"});
				//var user=users.get(this.id);
				//user.isHost=true;
				socket.emit("room_host",1);
			}
			//Send room information to client
			socket.emit("room_info",rooms.get(data.id));
			//socket.emit("user_info",users.get(this.id));
		});
		socket.on('room_create',function(id){
			if(!isRoomEmpty(id)){
				createRoom(id);
			}
		});
		socket.on('room_exsist',function(id){
			return isRoomEmpty(id);
		});
		socket.on("room_plugin",function(data){
			console.log(data.content);
			if(data.roomId!=null){
				io.emit("room_plugin",data);
			}
		});
	});
};


module.exports=socketServer;
