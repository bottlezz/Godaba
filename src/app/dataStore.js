function dataStore(){
  this.users = new Map();
  this.rooms = new Map();
  var data=new Map();
  this.getData=function(name){
    return data.get(a);
  }
  this.setData=function(name,value){
    return data.set(name,value);
  }
}
module.exports=new dataStore();
