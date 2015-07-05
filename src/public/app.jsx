function scrollBottom(){
	var $msgWin=$('.window');
	$msgWin.scrollTop($msgWin.scrollHeight);
}

function renderApp(){
	return React.render(
        <AppWidget />,
        document.getElementById('container')
      );	
} 
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
