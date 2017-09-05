import React from 'react';
import {hashHistory} from 'react-router';

import MyAjax from './MyAjax.js';
export default class List extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list:[],
            name:[]
        }
    }
    componentWillMount(){
        var that = this;
        var bid = this.props.location.query.brandID;
        var name = this.props.location.query.name;
        var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId='+bid+'&start=1';
        MyAjax.fetch(url,function(data){
            var s = data.data;
            console.log(s);
            that.setState({
                list:s,
                name:name
            })
        },function(err){
            console.log(err)
        })
    }

    tocart(gid,brandId){
        hashHistory.push({
            pathname:'detail',
            query:{
                gid:gid,
                brandId:brandId
            }
        })
    }

     addcart(obj){      
        var that = this;
        console.log(obj)
        var str = localStorage.getItem('hadlogin');
        if(str == null){
            hashHistory.pathname({
                pathname:'user'
            })
        }else{
            var name = obj.name;
	        var img = obj.verticalImage;
	        var price = obj.vipshopPrice;
	        var gid = obj.gid;
	        var obj = {
	          name:name,
	          img:img,
	          price:price,
	          gid:gid
            }
            console.log(obj)
            var islocalcart = localStorage.getItem('pro');
         if(islocalcart == null){
             var Arr = [];
             obj.num = 1;
             Arr.push(obj);
             var Str = JSON.stringify(Arr);
             localStorage.setItem('pro',Str);
             $('.cover').html('成功加入购物车');
             $('.cover').css('display','block');
             setTimeout(function(){
             		$('.cover').css('display','none')
             },2000)
         }else{
            var cartArr = JSON.parse(islocalcart);
                var flag = that.isexit(obj,cartArr);
                if(flag){
                	flag.num++;
                }else{
                	obj.num = 1;
                	cartArr.push(obj);
                }
                var arrStr = JSON.stringify(cartArr);
                localStorage.setItem('pro',arrStr)
                $('.cover').html('成功加入购物车');
		             $('.cover').css('display','block');
		             setTimeout(function(){
		             		$('.cover').css('display','none')
		             },2000)
         }
        }
    }


     isexit(currentPro,cartPro){
	    for(var i in cartPro){
	        if(currentPro.gid == cartPro[i].gid){
	          return cartPro[i]
	        }
	    }
	    return false;
      }
      goback(){
          window.history.go(-1);
      }
        gohome(){
            hashHistory.push({
                pathname:'/'
            })
        }
    render(){
        var that = this;
        var name = that.state.name;
        console.log(this.props.location.query.brandID)
        var data = that.state.list;
        var arr = [];
        for(var i in data){
            arr.push(
                <li key = {i}>
                    <img src = {data[i].goods.image} onClick = {this.tocart.bind(this,data[i].goods.gid,data[i].goods.brandId)}/ >
                    <p className = 'name'>
                        <span className = 'firstname'>{data[i].goods.brandStoreName}</span>
                        <span className = 'proname'>{data[i].goods.productName}</span>
                    </p>
                    <p className = 'price'>
                        <span className = 'newprice'>￥{data[i].goods.vipshopPrice}</span>
                        <del className = 'oldprice'>￥{data[i].goods.marketPrice}</del>
                        <i className = 'iconfont' onClick = {this.addcart.bind(this,data[i].goods)}>&#xe639;</i>
                    </p>
                </li>
            )
        }
        return(
            <div className = 'type'>
                 <span className = 'cover'>成功加入购物车</span>
                <header id = 'header'>
                    <i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
                    <div className = 'title'>
                        {name}
                    </div>
                    <i className = 'iconfont' onClick = {this.gohome.bind(this)}>&#xe60c;</i>
                </header>
                <div id = 'con'>
                    <ul id = 'list'>
                        {arr}
                    </ul>
                </div>
              
            </div>
        )
    }
}