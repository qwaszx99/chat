import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Modal,Button} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from './../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
	state=>state.user,
	{logoutSubmit}
)
export default  class User extends PureComponent{

	constructor(props){
		super(props);
		this.logout=this.logout.bind(this);	
	}
	logout(){
		const alert=Modal.alert;
		alert('注销', '确认退出登录吗???', [
	    { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
	    { text: '确认', onPress: () => {
	    	browserCookie.erase('userid');
	    	this.props.logoutSubmit();
		}}
	  ]);
		//browserCookie.erase('userid');
		//window.location.href=window.location.href;
		//console.log('logout');
	}
	
	render(){	
		const Item = List.Item;
		const Brief = Item.Brief;		
		return this.props.user ? (
			<div>				
				<Result
					img={<img src={require(`./../images/${this.props.avatar}.png`)} style={{width:50}} alt=""/>}
					title={this.props.user}
					message={this.props.type==='boss' ? this.props.company : null}
				/>
				<List renderHeader={()=>'简介'}>
					<Item multipleLine >
						{this.props.title}
						{this.props.desc.split('\n').map(v=>(<Brief key={v}>{v}</Brief>))}
						{this.props.money ? <Brief>薪资：{this.props.money}</Brief> : null}
						
					</Item>
				</List>
				<WhiteSpace></WhiteSpace>
				<List>
					<Item arrow="horizontal" onClick={this.logout}>退出登录</Item>
				</List>	
				<List><Button type="primary" onClick={()=>{console.log('我爱你')}}>hello</Button></List>
					
			</div>
		) : (<Redirect to={this.props.redirectTo}></Redirect>)
		

	}

}

