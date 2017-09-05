import React from 'react';
import {hashHistory,Router} from 'react-router';

import MyAjax from './MyAjax.js';
export default class Find extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            findlist:[]
        }
    }
    
    componentWillMount(){
        var that = this;
        var word = this.props.location.query.word;
        var url = 'http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+word+'&page=1';
        MyAjax.fetch(url,function(data){
      
        	var s = data.data;
        	that.setState({
        		findlist:s
        	})
        },function(err){
        	console.log(err)
        })
    }
    
    goback(){
    	window.history.go(-1);
    }
    gohome(){
    	hashHistory.push({
    		pathname:'/'
    	})
    }
    
    addcart(gid,brandId){
    	hashHistory.push({
    		pathname:'detail',
    		query:{
    			gid:gid,
    			brandId:brandId
    		}
    	})
    }
    
    tocart(event){
    	hashHistory.push({
    		pathname:'mycart'
    	})
    	event.stopPropagation();
    }
    render(){
        var that = this;
        var data  = that.state.findlist;
   		console.log(data)
        var arr = [];
        for(var i in data){
            arr.push(<li key = {i} onClick = {this.addcart.bind(this,data[i].goods.gid,data[i].goods.brandId)}>
                    <div className = 'left'>
                        <img src = {data[i].goods.image} />
                    </div>
                    <div className = 'right'>
                        <p className = 'names'>{data[i].goods.brandStoreName}</p>
                        <p className = 'instro'>{data[i].goods.productName}</p>
                        <p className = 'shop'>{data[i].goodsStock.saled}人购买</p>
                        <p className = 'price'>
                            <span className = 'newprice'>￥<i>{data[i].goods.vipshopPrice}</i></span>
                            <del>￥{data[i].goods.marketPrice}</del>
                            <i className = 'iconfont' onClick = {this.tocart.bind(this)}>&#xe639;</i>
                        </p>
                    </div>
                </li>)
            
        }
        return (
            <div className = 'type'>           
                <header id = 'header'>
                    <i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
                    <div className = 'title'>
                        <input type = 'text'  placeholder = '搜索商品' />
                    </div>
                    <i className = 'iconfont' onClick = {this.gohome.bind(this)}>&#xe60c;</i>
                </header>
                
                <div id = 'content'>
                    <ul id = 'findlist'>
                       	{arr}
                    </ul>
                </div>               
            </div>
        )
    }
        
    }