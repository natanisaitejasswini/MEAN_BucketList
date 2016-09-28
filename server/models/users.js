var mongoose = require('mongoose');
var deepPopulate = require('mongoose-deep-populate')(mongoose)
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type:String, required: true, minlength:4},
	_tasks:[{type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
	},{timestamps: true});
var user = mongoose.model('User', UserSchema);
UserSchema.plugin(deepPopulate); 

var taskSchema = mongoose.Schema({
  title:{type:String, required:true, minlength:5},
  _creator:{type:mongoose.Schema.Types.ObjectId, ref: 'User'},
  description:{type:String, required:true, minlength:10},
  complete:{type:Boolean}
},{timestamps:true})
taskSchema.plugin(deepPopulate);
var task = mongoose.model('Task', taskSchema)

