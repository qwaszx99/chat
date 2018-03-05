const express=require('express');
const Router=express.Router();
const utils=require('utility');
//连接数据库
const model=require('./model');
const User=model.getModel('user');
const Chat=model.getModel('chat');
const _filter={'pwd':0,'_v':0};
// Chat.remove({},function(err,data){
	
// })
//==============================================================
//获取数据
Router.get('/list',function(req,res){
	const {type}=req.query;//get参数query、post参数body
	//User.remove({},function(e,d){})
	User.find({type},function(err,data){
		return res.json({data,code:0});
	})
})
//==============================================================
//获取聊天信息列表
Router.get('/getmsglist',function(req,res){
	const user=req.cookies.userid;
	User.find({},function(err,data){//查出所有的用户信息 是数组形式
		//将数组转化为对象
		let users={}
		data.forEach(v=>{
			users[v._id]={name:v.user,avatar:v.avatar}
		})
		//多个查询条件
	    //{'$or':[{from:user,to:user}]}
		Chat.find({'$or':[{from:user},{to:user}]},function(err,data){
			if(!err){
				return res.json({code:0,msgs:data,users:users})
			}
		})	
	})	

})
//==============================================================
//更新数据
Router.post('/update',function(req,res){
	const userid=req.cookies.userid;
	if(!userid){
		return json.dumps({code:1});
	}
	const body=req.body;
	//查找并更新
	User.findByIdAndUpdate(userid,body,function(err,doc){
		const data=Object.assign({},{
			user:doc.user,
			type:doc.type
		},body)
		return res.json({code:0,data});
	})
})
//=============================================================
//实现登录页面
Router.post('/login',function(req,res){
	const {user,pwd}=req.body;
	User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,data){
		if(!data){
			return res.json({code:1,msg:'用户名或者密码不存在'});
		}
		res.cookie('userid',data._id);
		return res.json({code:0,data:data});
	})
})
//==============================================================
//实现注册功能
Router.post('/register',function(req,res){
	console.log(req.body);
	const {user,pwd,type}=req.body;//解构赋值
	//用户名不能重复
	User.findOne({user:user},function(err,data){
		//如果存在
		if(data){
			return res.json({code:1,msg:'用户名重复'});
		}
		const userModel=new User({user,type,pwd:md5Pwd(pwd)})
		userModel.save(function(err,data){
			if(err){
				return res.json({code:1,msg:'后端错误'})
			}
			const {user,type,_id}=data;
			res.cookie('userid',_id);
			return res.json({code:0,data:{user,type,_id}});
		})		
	})
})
//=============================================================
//获取用户信息
Router.get('/info',function(req,res){
	const {userid}=req.cookies;
	//用户有没有cookie
	if(!userid){
		return res.json({code:1});
	}
	User.findOne({_id:userid},_filter,function(err,data){
		if(err){
			return res.json({code:1,msg:'后端出错了'});
		}
		if(data){
			return res.json({code:0,data:data});
		}
	});
})
//=============================================================
Router.post('/readmsg',function(req,res){
	const userid=req.cookies.userid;
	const {from}=req.body;
	Chat.update(
		{from,to:userid},
		{'$set':{read:true}},
		{'multi':true},
		function(err,data){
		console.log(data);
		if(!err){
			return res.json({code:0,num:data.nModified});
		}
		return res.json({code:1,msg:'修改失败'});
	});
})
//==============================================================
function md5Pwd(pwd) {
	const salt='immoc_is_good_56hkk9240jmhbgv';
	return utils.md5(utils.md5(pwd+salt));
}
module.exports=Router;