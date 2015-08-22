AppWidget = React.createClass({displayName: "AppWidget",
	getInitialState: function() {
      return {text: "", messages:[]};
    },
	updateText: function(t){

	    var update=this.state.messages.concat(t);
		this.setState({messages:update});
		
	},
	sendToServer:function(msg){
		this.props.socket.emit('msg',msg);
	},
	render:function(){
		return(
			React.createElement("div", null, 
			React.createElement("span", null, this.state.text), 
			 React.createElement(TopBox, {title: "DashBoard"}), 
			 React.createElement(MessageBox, {ref: "msgWin", items: this.state.messages}), 
			 React.createElement(InputBox, {
			 	onMsgSend: this.sendToServer}
			 )
			)
		);
	}
	
});

var TopBox = React.createClass({displayName: "TopBox",
	render:function(){
		return (
			React.createElement("div", {className: "nav"}, 
			React.createElement("h2", null, this.props.title)
			)
		);
	}
});
var MessageBox = React.createClass({displayName: "MessageBox",
	componentDidUpdate: function( prevProps,  prevState)
	{
		this.getDOMNode().scrollTop=this.getDOMNode().scrollHeight;
	},
	render:function(){
		var createLine = function(itemText, index){
			return React.createElement(MessageLine, {text: itemText})
		}
		return (
			React.createElement("div", {className: "window"}, "this is message box",  
			this.props.items.map(createLine)
			)
		);
	}
});

var InputBox = React.createClass({displayName: "InputBox",
	handleSubmit: function(e){
		 e.preventDefault();
		 this.props.onMsgSend(this.refs.userInput.getDOMNode().value);
		 this.refs.userInput.getDOMNode().value="";
	},
	render:function(){
		return (
			React.createElement("div", {className: "input"}, 
			React.createElement("form", {onSubmit: this.handleSubmit}, 
			React.createElement("input", {type: "text", placeholder: "Type here...", ref: "userInput"}), 
			React.createElement("button", null, "Send")
			
			)
			)
		);
	}
});

var MessageLine = React.createClass ({displayName: "MessageLine",
	render:function(){
		return (
			React.createElement("li", null, this.props.text, " ")
		);
	}
});

