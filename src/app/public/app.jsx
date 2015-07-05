function scrollBottom(){
	var $msgWin=$('.window');
	$msgWin.scrollTop($msgWin.scrollHeight);
};

function renderApp(){
	return React.render(
        <AppWidget socket={socket} />,
        document.getElementById('container')
      );	
};

//socket io setup
var socket =io.connect('http://localhost:8000');
  

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
}else{
	//connect room;
	//rendre page;
	app=renderApp();
	
}
