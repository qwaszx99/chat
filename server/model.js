const mongoose = require('mongoose');
//连接到本地 并使用chat集合
const DB_URL='mongodb://localhost:27017/imooc-chat';
mongoose.connect(DB_URL);

//创建模型

const models={
	user:{
		'user':{type:String,require:true},
		'pwd':{type:String,require:true},
		'type':{type:String,require:true},
		'avatar':{type:String},
		//个人简介或职位简介
		'desc':{type:String},
		//职位名
		'title':{type:String},
		//boss还有两个字段
		'company':{type:String},
		'money':{type:String}
	},
	chat:{
		'chatid':{'type':String,require:true},
		'from':{type:String,require:true},
		'to':{type:String,require:true},
		'read':{type:Boolean,require:true,default:false},
		'content':{type:String,require:true,default:''},
		'create_time':{type:Number,default:new Date().getTime()}//转化为时间戳
	}
}

for(let model in models){
	mongoose.model(model,new mongoose.Schema(models[model]));
}

module.exports={
	getModel:function(name){
		return mongoose.model(name);
	}
}