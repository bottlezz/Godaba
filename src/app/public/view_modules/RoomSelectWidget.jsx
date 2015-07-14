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
			<div className="well col-xs-12 col-md-5">
				<form action={name} method="GET">
					<div className={"form-group"}>
						<label>Room Name:</label>
						<input type="text" placeholder="room302...(no space)" ref="filterTextInput" className="form-control" onChange={this.handleChange}/>
					</div>
					<button className="btn">Join</button>
				</form>
				<div>
					<span>{name}</span>
				</div>
			</div>
		);
	}

});

var JoinRoomWidget = React.createClass({
	render:function(){
		return;
	}
});
