import React from 'react';
import axios from 'axios';//获取后端数据
import {withRouter} from 'react-router-dom';
import {loadData} from '../../redux/user.redux';
import {connect} from 'react-redux';
@withRouter
@connect(
	state=>state.user,
	{loadData}
)

export default class AuthRoute extends  React.Component{
	componentDidMount(){
		const publicList=['/login','/register'];
		const pathname=this.props.location.pathname;
		//如果用户在登录和注册页 不用获取用户信息
		if(publicList.indexOf(pathname)!==-1){
			return null;
		}
		//console.log(this.props.location.pathname);
		//获取用户信息
		axios.get('/user/info')
			.then(res=>{
				if(res.status===200){
					if(res.data.code===0){
						//有登录信息
						this.props.loadData(res.data.data);
					}else{						
						this.props.history.push('/login')//路由组件具有history属性
					}
				}
			})		
		//是否登录
		//当前url login不需要跳转
		//用户的type 是牛人还是boss
		//用户是否完善信息(选择头像 个人简介)
	}
	render(){
		return null;
	}
}