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
	handleChange: function() {
        this.setState({roomName:this.refs.filterTextInput.getDOMNode().value});
        console.log(this.state.roomName);
    },
	render:function(){
		var name=this.state.roomName;
		return (
			<form action={name} method="GET">
				<div>
				<input  type="text" placeholder="room302...(no space)" ref="filterTextInput" onChange={this.handleChange}/>
				<button>Join</button>
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
