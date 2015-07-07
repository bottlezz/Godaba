function scrollBottom(){
	var $msgWin=$('.window');
	$msgWin.scrollTop($msgWin.scrollHeight);
};

function renderChat(socket,roomid){
	return React.render(
        <ChatWidget socket={socket} roomId={roomid}/>,
        document.getElementById('container')
      );
};
function renderSelect(){
	return React.render(
        <CreateRoomWidget />,
        document.getElementById('container')
      );
};
//socket io setup


/* main logic starts here; */
var socket =io();



var roomid=window.location.pathname;
var app;
if(roomid=="/"){
	//main page, do nothing;
	// render room selection, join room /create room
	renderSelect();
}else{
	//connect room;

	//render chat;
	var chat=renderChat(socket,roomid);


}
