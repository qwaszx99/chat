import React from 'react';
import {Grid,List} from 'antd-mobile';
import PropTypes from 'prop-types';
export default class AvatarSelector extends React.Component{
	static propTypes={
		selectAvatar:PropTypes.func.isRequired
	}
	constructor(props){
		super(props);
		this.state={
			icon:'',
			text:''
		}
	}
	render(){
		const avatarList='boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
							.split(',')
							.map(value=>({
									icon:require(`../images/${value}.png`),
									text:value
							}));
		const gridHeader=this.state.text
		 ? <div>
		 		<span>已选择头像</span>
		 		<img style={{width:20}} src={this.state.icon} alt=""/>
			</div>
		:   '请选择头像'				
		return (
			<div>				
				<List renderHeader={()=>gridHeader}>
					<Grid 
						data={avatarList} 
						columnNum={3}
						onClick={ele=>{
							this.setState(ele);
							this.props.selectAvatar(ele.text);
						}}
					/>
				</List>				
			</div>
		)
	}
}