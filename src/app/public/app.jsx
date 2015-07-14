function scrollBottom(){
	var $msgWin=$('.window');
	$msgWin.scrollTop($msgWin.scrollHeight);
};
//userid is user's name, space allowed.
function renderChat(socket,roomid){
	return React.render(
        <ChatWidget socket={socket} roomId={roomid}/>,
        document.getElementById("mount")
      );
};
function renderSelect(){
	return React.render(
        <CreateRoomWidget />,
        document.getElementById("mount")
      );
};
function renderNoteClient(socket){
	return React.render(
		<SharedNoteClientWidget socket={socket}/>,
		document.getElementById("pluginMount")
	);
}
function renderNoteHost(socket,roomid){
	return React.render(
		<SharedNoteHostWidget socket={socket} roomId={roomid}/>,
		document.getElementById("pluginMount")
	);
}
//socket io setup


/* main logic starts here; */
var socket =io();
var isHost=false;


var roomid=decodeURI(window.location.pathname);

if(roomid=="/"){
	//main page, do nothing;
	// render room selection, join room /create room
	renderSelect();
}else{

  var note=renderNoteClient(socket);
	var chat=renderChat(socket,roomid);
	socket.on("room_host",function(){
		isHost=true;
		note=renderNoteHost(socket,roomid);
	});
}
