import React from 'react';
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile';
import {connect} from 'react-redux';
import io from 'socket.io-client';
import {getMsgList,sendMsg,recvMsg,readMsg} from './../../redux/chat.redux';
import {getChatId} from './../../util';
const socket=io('ws://localhost:9093');
@connect(
	state=>state,
	{getMsgList,sendMsg,recvMsg,readMsg}
)
export default class Chat extends React.Component{
	constructor(props){
		super(props);
		this.state={
			text:'',
			showEmoji:false,
			msg:[]
		}
	}
	componentDidMount(){
		if(!this.props.chat.chatmsg.length){
			this.props.getMsgList();
			this.props.recvMsg();	
		}
		
		//由于端口不一样，前后端跨域
		// socket.on('recvmsg',(data)=>{//用function找不到this
		// 	this.setState({
		// 		msg:[...this.state.msg,data.text]
		// 	})
		// })
	}
	componentWillUnmount(){//组件将要卸载时
		//console.log('unmount');
		//告诉后端消息已读
		const from=this.props.match.params.user;//聊天对象
		this.props.readMsg(from);
	}
	fixCarousel(){
		setTimeout(function(){
			window.dispatchEvent(new Event('resize'));
		},0)
	}
	handleSubmit(){
		//socket.emit('sendmsg',{text:this.state.text});
		//发送完成之后清空数据
		//this.setState({text:''});
		const from = this.props.user._id;
		const to=this.props.match.params.user;
		const msg=this.state.text;
		this.props.sendMsg({from,to, msg});
		this.setState({text:''});
	}
	render(){
		const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠ ️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋ 🖐 🖖 👋 💪 🖕 ✍ ️ 💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
				.split(' ')
				.filter(v=>v)
				.map(v=>({text:v}))
		const userid=this.props.match.params.user;
		const Item=List.Item;
		const users=this.props.chat.users;
		if(!users[userid]){
			return null;
		}
		const chatid=getChatId(userid,this.props.user._id);
		const chatmsgs=this.props.chat.chatmsg.filter(v=>v.chatid===chatid)
		return(			
			<div id="chat-page">
			<NavBar 
				mode='dark'
				icon={<Icon type="left"/>}
				onLeftClick={()=>{
					this.props.history.goBack();//history对象的方法
				}}
			>
				{users[userid].name}
			</NavBar>
			{chatmsgs.map(v=>{
				const avatar=require(`../images/${users[v.from].avatar}.png`)
				return v.from===userid
				 ? (<List key={v._id+Math.random()}>
				 		<Item
				 			thumb={avatar}
				 		>{v.content}</Item>
				 	</List>
				 ) 
				 : (<List key={v._id+Math.random()}>
				 		<Item 
				 			extra={<img src={avatar}/>}
				 			className="chat-me">{v.content}</Item>
				 	</List>
				 )
				
			})}
				<div className="sticky-footer">
					<List>
						<InputItem
							placeholder="请输入"
							value={this.state.text}
							onChange={v=>{
								this.setState({text:v})
							}}
							extra={
								<div>
									<span										
										style={{marginRight:15}}
										onClick={
											()=>{
												this.setState({showEmoji:!this.state.showEmoji});
												this.fixCarousel();
											}
										}

									>😁</span>
									<span onClick={()=>this.handleSubmit()}>发送</span>
								</div>
							}
						>

						</InputItem>
					</List>
					{this.state.showEmoji ? <Grid
						data={emoji}
						columnNum={6}
						carouselMaxRow={4}
						isCarousel={true}
						onClick={(el)=>{
							this.setState(({
								text:this.state.text+el.text
							}))							
						}}
					/> : null}
					
				</div>
			</div>
		)
	}
}