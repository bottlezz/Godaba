function scrollBottom(){
	var $msgWin=$('.window');
	$msgWin.scrollTop($msgWin.scrollHeight);
};

function renderChat(){
	return React.render(
        <ChatWidget socket={socket} />,
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
var socket =io();
  

  socket.on('msg', function(msg){
	   if(app!=null){
		   app.updateText(msg);
	   }
  });

/* main logic starts here; */

var roomid=window.location.pathname;
var app;
if(roomid=="/"){
	//main page, do nothing;
	renderSelect();
}else{
	//connect room;
	//rendre page;
	app=renderChat();
	
}
