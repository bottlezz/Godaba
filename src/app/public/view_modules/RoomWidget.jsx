/// this is the module to control all plugins
/// what should be save here?
/// data that needs to be shared by all plugins, such as , pub-sub handler, roomid. user information.

var RoomWidget = React.createClass({
  getInitialState:function(){
    return {roomid:null,claims:[],plugins:["chat"],roles:[]};
  },
  componentDidMount:function() {
    // body...
  },
  mountPlugin(pluginName){
    switch (pluginName) {
      case "chat":
        return (<ChatWidget socket={this.props.socket} roomId={roomid} key={pluginName}/>);
        break;
      case "sharedNote":
        for (var role in roles) {
          if(role=="sharedNoteHost"){
            return (<SharedNoteHostWidget socket={this.props.socket} roomId={roomid} key={pluginName}/>);
          }
        }
        return (<SharedNoteClientWidget socket={this.props.socket} key={pluginName}/>);
        break;

      default:
        return;
    }
  },
  render:function() {
    if(this.state.roomid== null){
      return (<CreateRoomWidget/>);
    }else{
      return (
        <div>
          {this.pluginObjs=this.state.plugins.map(this.mountPlugin)}
        </div>
      );
    }
  }
});
var RoomConfigWidget = React.createClass({
  getPluginList:function(){
    var list=["chat","sharedNote"];
    return list;
  },
  render:function(){
    return (<div>
    </div>);
  }
});
