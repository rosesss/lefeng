import React from 'react';
import {hashHistory} from 'react-router';

import MyAjax from './MyAjax.js';
export default class Search extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			hotlist:[],
			searchlist:[]
		}
	}
	componentWillMount(){
		var that = this;
		var url = 'http://w.lefeng.com/api/neptune/search/hot_keywords/v1?count=10&highlight=1';
		MyAjax.fetch(url,function(data){
			var s = data.data;
			that.setState({
				hotlist:s
			})
		},function(err){
			console.log(err)
		})
	}
	goback(){
		window.history.go(-1)
	}
	toshop(word){
		hashHistory.push({
			pathname:'searchlist',
			query:{
				word:word
			}
		})
	}
	tosearch(){
		var that = this;
		var word = $('.txt').val();
		var url = 'http://w.lefeng.com/api/neptune/search/suggestion/v1?keyword='+word+'&count=15';
		MyAjax.fetch(url,function(data){
			var s = data.data;
			that.setState({
				searchlist:s
			})
		},function(err){
			console.log(err)
		})
		$('.hot').css('display','none')
	}

	tolist(word){
		hashHistory.push({
			pathname:'findlist',
			query:{
				word:word
			}
		})
	}
	
	render(){
		var that = this;
		var data = this.state.hotlist;
		var arr = [];
		for(var i in data){
			arr.push(
					<span key = {i} onClick = {this.toshop.bind(this,data[i].word)} >{data[i].word}</span>
				)
		}
		
		var data1 = this.state.searchlist;
		
		var arr1 = [];
		if(data1.length>1){
			console.log(data1)
			for(var j in data1){
				arr1.push(
					<li key = {j} onClick = {this.tolist.bind(this,data1[j])}>
						<span>{data1[j]}</span>
					</li>
				)
			}
		}
		
		return(
				<div className = 'type'>
					<header id = 'headers'>
						<i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe726;</i>
						<div className = 'title' onChange = {this.tosearch.bind(this)}>
							<i className = 'iconfont'>&#xe609;</i>
							<input type = 'text' className = 'txt' placeholder = '请输入商品关键词' />
						</div>
						<div className = 'search'>
							搜索
						</div>
					</header>
						<div className = 'searchgoods'>
							<ul id = 'searchlist'>
								{arr1}
							</ul>
							<div className = 'hot'>
								<h2>热门搜索 :</h2>
								<div className = 'searchhot'>
									{arr}
								</div>
							</div>
						</div>
				</div>
			)
		}
	}
