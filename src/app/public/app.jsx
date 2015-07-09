function scrollBottom(){
	var $msgWin=$('.window');
	$msgWin.scrollTop($msgWin.scrollHeight);
};
//userid is user's name, space allowed.
function renderChat(socket,roomid,userid){
	return React.render(
        <ChatWidget socket={socket} roomId={roomid} userId={userid}/>,
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



var roomid=decodeURI(window.location.pathname);
var app;
if(roomid=="/"){
	//main page, do nothing;
	// render room selection, join room /create room
	renderSelect();
}else{
	//connect room;

	//render chat;
	var chat=renderChat(socket,roomid,"fake guy");


}
