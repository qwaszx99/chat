const express=require('express');

const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const model=require('./model');
const Chat=model.getModel('chat');
const app=express();
//work with express
const server=require('http').Server(app);
const io=require('socket.io')(server);
const UserRouter=require('./user');
//========================================
//监听到用户连接
io.on('connection',function(socket){
	//io为全局连接 socket 为当前连接
	console.log('user login');
	socket.on('sendmsg',function(data){
		console.log(data);
		const {from,to,msg}=data;
		const chatid=[from,to].sort().join('_');//排序合并字符串
		//io发送全局广播
		Chat.create({chatid,from,to,content:msg},function(err,data){
			io.emit('recvmsg',Object.assign({},data._doc));//nodejs里面缺少...展开符 object.assign与其类似
		})
		
	})
})
//=========================================
//开启中间件
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user',UserRouter);
//===========================================
//监听端口
server.listen(9093,function(){
	console.log('Node app start at port 9093');
})