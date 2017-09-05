import React from 'react';
import {Link,hashHistory} from 'react-router';

export default class Cart extends React.Component{
	constructor(props){
		super(props);
	}
	toHome(){
		hashHistory.push({
			pathname:'/'
		})
	}
	render(){
		return(
			<div id = 'cart'>
				<div id = 'touxiang'>
					<i className = 'iconfont'>&#xe635;</i>
				</div>
				<p>
					购物车空空
					<br/>
					<button onClick = {this.toHome.bind(this)}>去逛逛</button>
				</p>
			</div>
		)
	}
}
