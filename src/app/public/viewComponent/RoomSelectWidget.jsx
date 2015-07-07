var RoomSelectWidget = React.createClass({
	handleSubmit: function(e){
		 e.preventDefault();
		 this.props.onMsgSend(this.refs.userInput.getDOMNode().value);
		 this.refs.userInput.getDOMNode().value="";
	},
	render:function(){
		return (
			<div className={"input"}>
			<form onSubmit={this.handleSubmit}>
			<input type="text" placeholder="Type here..." ref="userInput" />
			<button>Send</button>
			
			</form>
			</div>
		);
	}
});

var CreateRoomWidget = React.createClass({
	getInitialState: function() {
	    return {roomName: ""};
	  },
	handleSubmit: function(e){
		 e.preventDefault();
	},
	handleChange: function() {
        this.setState({roomName:this.refs.filterTextInput.getDOMNode().value});
        console.log(this.state.roomName);
    },
	render:function(){
		var name=this.state.roomName;
		return (
			<form onSubmit={this.handleSubmit}>
				<div>
				<input  type="text" placeholder="room302...(no space)" ref="filterTextInput" onChange={this.handleChange}/>
				<a href={"/"+name}>Join</a>
				</div>
				<div>
					<span>{name}</span>
				</div>
			</form>
		);
	}
	
});

var JoinRoomWidget = React.createClass({
	render:function(){
		return;
	}
});