var AppWidget=React.createClass({
	getInitialState: function() {
      return {text: "", messages:[]};
    },
	updateText: function(t){

	    var update=this.state.messages.concat(t);
		this.setState({messages:update});
		
	},
	sendToServer:function(msg){
		
	},
	render:function(){
		return(
			<div>
			<span>{this.state.text}</span>
			 <TopBox title="DashBoard" />
			 <MessageBox ref='msgWin' items={this.state.messages}/> 
			 <InputBox 
			 	onMsgSend={this.updateText}
			 />
			</div>
		);
	}
	
});

var TopBox = React.createClass({
	render:function(){
		return (
			<div className={"nav"}>
			<h2>{this.props.title}</h2>
			</div>
		);
	}
});
var MessageBox = React.createClass({
	componentDidUpdate( prevProps,  prevState)
	{
		this.getDOMNode().scrollTop=this.getDOMNode().scrollHeight;
	},
	render:function(){
		var createLine = function(itemText, index){
			return <MessageLine text={itemText} />
		}
		return (
			<div className={"window"}>this is message box 
			{this.props.items.map(createLine)}
			</div>
		);
	}
});

var InputBox = React.createClass({
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

var MessageLine = React.createClass ({
	render:function(){
		return (
			<li>{this.props.text} </li>
		);
	}
});

