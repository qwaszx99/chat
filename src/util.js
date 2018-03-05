export function getRedirectPath({type,avatar}){
	//根据用户信息,返回跳转地址
	
	//根据用户类型 user.type  跳转 /boss/genius
	// 根据用户是否有头像 user.avatar /boss/info geniusinfo
	let url=(type==='boss') ? '/boss' : '/genius';
	//如果没有头像
	if(!avatar){
		url+='info';
	}
	return url;
}

export function getChatId(userId,targetId){
	return [userId,targetId].sort().join('_');
}
