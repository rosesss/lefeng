import React from 'react';
import {hashHistory} from 'react-router';
import MyAjax from './MyAjax.js';

export default class Molist extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            prolist:[],
            start:1,
            prolist1:[]
        }
    }

    componentWillMount(){
        var that = this;
        var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041476&start=1';
        MyAjax.fetch(url,function(data){
            var s = data.data;
            console.log(s)
            that.setState({
                prolist:s
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

    tosort(){       
        var that = this;
        var flag = that.state.flag;
        if(flag){
            var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041476&start=1&sort=%7B%22vipshopPrice%22%3A%22asc%22%7D';
            MyAjax.fetch(url,function(data){
                console.log(data.data);
                var a = data.data;
                that.setState({
                    prolist:a,
                    flag:false
                })                
            },function(err){
                console.log(err)
            })            
        }else{
            var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041476&start=1&sort=%7B%22vipshopPrice%22%3A%22desc%22%7D';
            MyAjax.fetch(url,function(data){
                console.log(data.data)
                var b = data.data;
                that.setState({
                    prolist:b,
                    flag:true
                })
            },function(err){
                console.log(err)
            })   
        }
    }

    tosale(){
        var that = this;
        var flag = that.state.flag;
        if(flag){
            var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041476&start=1&sort=%7B%22sale%22%3A%22desc%22%7D';
            MyAjax.fetch(url,function(data){
                console.log(data)
                var c = data.data;
                that.setState({
                    prolist:c,
                    flag:false
                })
            },function(err){
                console.log(err)
            })
        }else{
            var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041476&start=1&sort=%7B%22sale%22%3A%22asc%22%7D';
            MyAjax.fetch(url,function(data){
                var d = data.data;
                that.setState({
                    prolist:d,
                    flag:true
                })
            },function(err){
                confirm.log(err)
            })
        }
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
        var str = localStorage.getItem('hadlogin');
        if(str == null){
            hashHistory.pathname({
                pathname:'user'
            })
        }else{
            var name = obj.name;
	        var img = obj.image;
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
      
    addItem(){
        var that = this;
        var scrollTop = $('.type').scrollTop();
        var h = $('.type').height();
        var hh = h-scrollTop;
        if(hh <= 100){
            var i = that.state.start;
            i++;
            that.setState({
                start:i
            })
            var url = 'http://w.lefeng.com/api/neptune/goods/list_with_stock/v1?brandId=755041476&start='+i;
            MyAjax.fetch(url,function(data){
                // console.log(data.data);
                var n = data.data;
                that.setState({
                    prolist1:n
                })
            },function(err){
                console.log(err)
            })
        }
    }
    render(){
        var that = this;
        var data = this.state.prolist;
        var arr = [];
        var data1 = this.state.prolist1;
        var arr1 = [];
        for(var i in data){
            arr.push(
                <li key = {i}>
                    <div className = 'proimg' onClick = {this.tocart.bind(this,data[i].goods.gid,data[i].goods.brandId)}>
                        <img src = {data[i].goods.image} />
                    </div>
                    <p className = 'protitle'>
                        <span className = 'protit'>{data[i].goods.brandStoreName}</span>
                        <span>{data[i].goods.productName}</span>
                    </p>
                    <p className = 'proprice'>
                        <span className = 'oldprice'>￥{data[i].goods.vipshopPrice}</span>
                        <del className = 'newprice'>￥{data[i].goods.marketPrice}</del>
                        <i className = 'iconfont' onClick = {this.addcart.bind(this,data[i].goods)}>&#xe639;</i>
                    </p>
                </li>
            )
        }
        for(var j in data1){
            arr1.push(
                <li key = {j}>
                    <div className = 'proimg' onClick = {this.tocart.bind(this,data[j].goods.gid,data[j].goods.brandId)}>
                        <img src = {data[j].goods.image} />
                    </div>
                    <p className = 'protitle'>
                        <span className = 'protit'>{data[j].goods.brandStoreName}</span>
                        <span>{data[j].goods.productName}</span>
                    </p>
                    <p className = 'proprice'>
                        <span className = 'oldprice'>￥{data[j].goods.vipshopPrice}</span>
                        <del className = 'newprice'>￥{data[j].goods.marketPrice}</del>
                        <i className = 'iconfont' onClick = {this.addcart.bind(this,data[j].goods)}>&#xe639;</i>
                    </p>
                </li>
            )
        }

        return(
            <div className = 'type' onScroll = {this.addItem.bind(this)}>
                <span className = 'cover'>成功加入购物车</span>
                 <header id = 'header'>
                     <i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
                     <div className = 'title'>
                         膜么哒
                     </div>
                     <i className = 'iconfont' id = 'home' onClick = {this.gohome.bind(this)}>&#xe60c;</i>
                 </header>
                 <div id = 'content'>
                     <div className = 'img'>
                         <img src = 'img/listbg.jpg'/>
                     </div>
                     <div className = 'listnav'>
                         <div className = 'nav' onClick = {this.tosort.bind(this,i)}>
                             <i className = 'iconfont'>&#xe620;</i>
                             <span>价格</span>
                         </div>
                         <div className = 'nav' onClick = {this.tosale.bind(this)}>
                             <i className = 'iconfont'>&#xe620;</i>
                             <span>销量</span>
                         </div>
                         <div className = 'nav' id = 'chose'>
                             <i className = 'iconfont'>&#xe601;</i>
                             <span>筛选</span>
                         </div>
                     </div>
                     <ul id = 'prolist'>
                            {arr}
                            {arr1}
                     </ul>
                 </div>

            </div>
           
        )
    }
}