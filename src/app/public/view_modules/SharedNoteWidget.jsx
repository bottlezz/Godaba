var SharedNoteHostWidget = React.createClass({
  getInitialState: function() {
      return { pageContents:[]};
  },

  handleClick: function(i) {
  //  console.log(i);
    var content= this.state.pageContents[i];
    this.refs.display.getDOMNode().innerHTML = content;

    if(this.props.socket!=null){
      //console.log(this.props.roomId);
      this.props.socket.emit("room_plugin", {roomId:this.props.roomId, type:"SharedNote", content:content});
    }
  },
  convertMD:function(){
    marked.setOptions({
      renderer: new marked.Renderer(),
    });
    var text=this.refs.input.getDOMNode().value;
    var convert = marked(text);
    this.setState({pageContents : convert.split('<hr>')});
    //this.refs.display.getDOMNode().innerHTML = marked(text);
  },
  render : function(){

    return(
    <div className="col-md-12">

      <nav>
        <ul className="pagination">
          {this.state.pageContents.map(function(data,index){
            return <li><a href="#" onClick = {this.handleClick.bind(this, index)}>{index+1}</a></li>;
          },this)}
        </ul>

      </nav>
      <div ref="display"></div>

      <div className="form-group">
        <label>Markdown Contents:</label>
        <textarea ref="input" rows="7" className="form-control" ></textarea>
      </div>
      <button onClick = {this.convertMD} className="btn">Trans</button>
    </div>);
  }
});
var SharedNoteClientWidget = React.createClass({
  componentDidMount:function(){
    this.props.socket.plugin=this;
    this.props.socket.on("room_plugin",function(data){
      this.plugin.onUpdate(data.content);
    //  console.log(data);
    });
  },
  onUpdate:function(content){
    this.refs.display.getDOMNode().innerHTML=content;
  },
  componentWillUnmount:function(){
    this.props.socket.removeListener('room_plugin');
  },
  render:function(){
    return (
      <div className="col-md-12">
        <div ref="display"></div>
      </div>
    );
  }

});
