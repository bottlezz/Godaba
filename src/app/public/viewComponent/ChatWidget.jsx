var ChatWidget=React.createClass({
	getInitialState: function() {
      return { messages:[]};
  },
	componentDidMount:function(){
		//initial socket io once loaded.
		this.props.socket.app=this;
		this.props.socket.on('room_msg', function(msg){
				//"this" is socket here.
				this.app.updateText(msg);
		});
	},
	updateText: function(t){
		//handle message input
	  var update=this.state.messages.concat(t);
		this.setState({messages:update});
	},
	updateName:function (e){
		//handle name input
		e.preventDefault();
		var name=this.refs.nameBox.getDOMNode().value;
		this.props.userId=name;
		this.props.socket.emit("room_join",{roomId:this.props.roomId,userId:this.props.userId});
		this.forceUpdate();
	},
	sendToServer:function(msg){
		this.props.socket.emit('room_msg',{type:10, roomId:this.props.roomId, userId:this.props.userId,action:"msg", content:msg});
	},
	render:function(){
		if(this.props.userId==null){
			return(
				<div className="well col-xs-12 col-md-5">
						<form onSubmit={this.updateName} >
							<div className={"form-group"}>
								<label>Your Name:</label>
								<input ref="nameBox" type="text" palceholder="John.Doe" className={"form-control"} autofocus></input>
							</div>
							<input type="submit" value="Done" className={"btn"}></input>
						</form>

				</div>
			);
		}else{

			return(

				<div>
				 <MessageBox ref='msgWin' items={this.state.messages}/>
				 <InputBox
				 	onMsgSend={this.sendToServer}
				 />
				</div>

			);
		}
	}

});


var MessageBox = React.createClass({
	componentDidUpdate:function( prevProps,  prevState)
	{
		this.getDOMNode().scrollTop=this.getDOMNode().scrollHeight;
	},
	render:function(){
		var createLine = function(data, index){
			return <MessageLine data={data}/>
		};
		return (
			<div className={"messageWidget"}>
				<p className = "col-md-11">Welcome!</p>
				<ul className = "col-md-11">
					{this.props.items.map(createLine)}
				</ul>
			</div>
		);
	}
});

var InputBox = React.createClass({
	handleSubmit: function(e){
		 e.preventDefault();
		 this.props.onMsgSend(this.refs.userInput.getDOMNode().value);
		 this.refs.userInput.getDOMNode().value="";
		 autosize.update(jQuery(this.refs.userInput.getDOMNode()));
	},
	componentDidMount:function(){
		jQuery(this.refs.userInput.getDOMNode()).keydown(function(e){
				// Enter was pressed without shift key
			if (e.keyCode == 13 && !e.shiftKey)
			{
			    // prevent default behavior
			    e.preventDefault();
					jQuery(this).closest("form").find("input[type=submit]").trigger("click");
			}
		});
		autosize(jQuery(this.refs.userInput.getDOMNode()));
	},
	render:function(){
		return (
			<div className={"inputWidget row"}>
			<form onSubmit={this.handleSubmit}>
				<div className={"col-xs-9 nopadding"}>
					<textarea rows="1" className={"form-control"} placeholder="Type here..." ref="userInput">
					</textarea>
				</div>
				<input type="submit" className={" btn col-xs-3"} value="send"/>






			</form>
			</div>
		);
	}
});

var MessageLine = React.createClass ({
	render:function(){
	  if(this.props.data.action=="msg"){
			return (
				<li className={"row"}>
					<span className={"col-md-1 col-xs-2"}>{this.props.data.userId+":"}</span>
					<p className={"col-md-10 col-xs-10"}>{this.props.data.content}</p>
				</li>
			);
		}else{
			return (
				<li className={"row"}>
				<p className={"col-md-11"}>{this.props.data.content}</p>
				</li>
			)
		}
	}
});
