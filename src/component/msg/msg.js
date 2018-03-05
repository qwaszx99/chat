import React from 'react';
import {connect} from 'react-redux';
import {List,Badge} from 'antd-mobile';
@connect(
	state=>state
)	
export default class Msg extends React.Component{
	getLast(arr){
		return arr[arr.length-1];
	}
	render(){
		const Brief=List.Item.Brief;
		const userId=this.props.user._id;//当前登录用户的id
		const userInfo=this.props.chat.users;
		//console.log(this.props);
		//按照聊天用户分组,根据chatid
		const msgGroup={};
		this.props.chat.chatmsg.forEach(v=>{
			msgGroup[v.chatid]=msgGroup[v.chatid] || [];//默认有一个空数组
			msgGroup[v.chatid].push(v);
			// console.log(Object.values({name:'imooc',age:18}))
		})
		// console.log([3,1,2,6,5].sort(function(a,b){
		// 	return b-a;
		// }))
		const chatList=Object.values(msgGroup).sort((a,b)=>{
			const a_last=this.getLast(a).create_time;
			const b_last=this.getLast(b).create_time;
			return b_last - a_last;
		});
		console.log(chatList);
		return(
			<div>
				
					{chatList.map(v=>{
						//console.log(v)
						const lastItem=this.getLast(v);
						const targetId=v[0].from===userId ? v[0].to : v[0].from;
						const name=userInfo[targetId] ? userInfo[targetId].name : '';
						const avatar=userInfo[targetId] ? userInfo[targetId].avatar : '';
						const unreadNum=v.filter(v=>!v.read && v.to===userId).length;
						if(!userInfo[targetId]){
							return null;
						}
						return(
							<List key={lastItem._id}>
								<List.Item 
									arrow='horizontal'
									extra={<Badge text={unreadNum}/>}	
									thumb={require(`./../images/${avatar}.png`)}
									onClick={()=>{this.props.history.push(`/chat/${targetId}`)}}
								>	
									{lastItem.content}
									<Brief>{name}</Brief>							
								</List.Item>
							</List>
						)}
					)}					
				
			</div>
		)
	}
}