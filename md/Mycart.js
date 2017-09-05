import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

export default class Mycart extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			cartlist:[]
		}
	}

	componentWillMount(){
		var that = this;
		var objstr = localStorage.getItem('pro');
		// console.log(JSON.parse(objstr));
		var data = JSON.parse(objstr);
		that.setState({
			cartlist:data
		})
	}

	delete(i){
		var that = this;
		var deleteobj = JSON.parse(localStorage.getItem('pro'));
		var Deleteobj = deleteobj[i];
		if(Deleteobj.num > 1){
			Deleteobj.num--;
		}else{
			Deleteobj.num == 1;
		}
		$('.addordelete').eq(i).find('.len').html(Deleteobj.num);
		var pri = that.state.cartlist[i].price;
		$('.money').eq(i).find('.price').html('￥'+Deleteobj.num*pri)
		var deleteStr = JSON.stringify(deleteobj);
		localStorage.setItem('pro',deleteStr);
	}


	add(i){
		var that = this;
		var addobj = JSON.parse(localStorage.getItem('pro'));
		var addObj = addobj[i];
		addObj.num++;
		$('.addordelete').eq(i).find('.len').html(addObj.num);
		var pri = that.state.cartlist[i].price;
		$('.money').eq(i).find('.price').html('￥'+addObj.num*pri)
		var addStr = JSON.stringify(addobj);
		localStorage.setItem('pro',addStr);
	}

	remove(i){
		var removeObj = JSON.parse(localStorage.getItem('pro'));
		var newArr = removeObj.splice(i,1);
		console.log(removeObj);
		var newStr = JSON.stringify(removeObj);
		localStorage.setItem('pro',newStr);
		$('#cartlist').find('.cartcontent').eq(i).css('display','none');	
		var len = removeObj.length;
		console.log(len)
		if(len == 0){
			hashHistory.push({
				pathname:'cart'
			})
		}
	}

	goback(){
		window.history.go(-1);
	}

	topay(){
		var str = localStorage.getItem('custromInfo');
		if(str == null){
			hashHistory.push({
				pathname:'pay'
			})
		}else{
			hashHistory.push({
				pathname:'topay'
			})
		}
		
	}
	render(){
		var that = this;
		var data = this.state.cartlist;
		var arr = [];
		for(var i in data){
			arr.push(
				<div key = {i} className = 'cartcontent'>
					<li key = {i}>
						<div className = 'left'>
							<img src = {data[i].img} />
						</div>
						<div className = 'right'>
							<p className = 'name'>{data[i].name}</p>
							<p className = 'price'>￥{data[i].price}</p>
							<p className = 'addordelete'>
								<button onClick = {this.delete.bind(this,i)}>-</button>
								<span className = 'len'>{data[i].num}</span>
								<button onClick = {this.add.bind(this,i)}>+</button>
								<span className = 'delete' onClick = {this.remove.bind(this,i)}>X</span>
							</p>
						</div>
					</li>
					<div className = 'money'>
						<span>商品总价：</span>
						<span className = 'price'>￥{data[i].price*data[i].num}</span>
					</div>
				</div>
			)
		}
		return(
			<div id = 'type'>
				
				<header id = 'header'>
					<i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
					<div className = 'title'>购物车</div>
				</header>
				<div className = 'cartcon'>					
					<h2>乐蜂</h2>
					<ul id = 'cartlist'>
							{arr}
					</ul>
				</div>
				<div id = 'topay'>
					<span onClick = {this.topay.bind(this)}>去支付</span>
				</div>	
			</div>
		)
	}
}
