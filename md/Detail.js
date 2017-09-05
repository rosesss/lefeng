import React from 'react';
import {Link,hashHistory} from 'react-router';

import MyAjax from './MyAjax.js';
export default class Shop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      con:[],
      type:[],
      msg:[],
      img:[],
      shopxin:[]
    }
  }

  componentWillMount(){
    var that = this;
      var a = this.props.location.query.gid;
      var b = this.props.location.query.brandId;
      var url = 'http://w.lefeng.com/api/neptune/goods/detail_with_stock/v1?needBrandInfo=true&gid='+a+'&brandId='+b+'';

      MyAjax.fetch(url,function(data){
        var s = data.data.goods;
        console.log(s)
        var a = data.data.goods.descriptions;
        that.setState({
            con:s,
            type:s.pmsList[0].type,
            msg:s.pmsList[0].msg,
            name:s.name,
            img:s.smallImage[0],
            price:s.vipshopPrice,
            gid:s.gid,
            shopxin:a
        })
      },function(err){
        console.log(err)
      })
  }


  addcart(){
      var that = this;
      var str =  localStorage.getItem('hadlogin');
      console.log(str)
      if(str == null){
	        hashHistory.push({
	          pathname:'user'
	        })
      }else{
	        var name = that.state.name;
	        var img = that.state.img;
	        var price = that.state.price;
	        var gid = that.state.gid;
	        var obj = {
	          name:name,
	          img:img,
	          price:price,
	          gid:gid
	        }

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


	  showcart(){
	  		hashHistory.push({
	  			pathname:'mycart'
	  		})
	  }


	  goback(){
	    window.history.go(-1)
	  }

	  gohome(){
	    hashHistory.push({
	      pathname:'/'
	    })
	  }

    shopshow(){
      $('.txts').css('display','none');
      $('#shopxin').css('display','block');
      
    }
    shophide(){
       $('.txts').css('display','block');
       $('#shopxin').css('display','none');
    }
  render(){
    var that = this;
    var data = this.state.con;
    console.log(data)
    var arr = [];
    var type = this.state.type;
    var msg = this.state.msg;
    var data1 = this.state.shopxin;
    var arr1 = [];
      arr.push(
        <div key = {1}>
            <header id = 'header'>
                <i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
                <h2>{data.name}</h2>
                <i className = 'iconfont' onClick = {this.gohome.bind(this)}>&#xe60c;</i>
            </header>
            <div id = 'img'>
                <img src = {data.verticalImage} />
            </div>
            <div className = 'instro'>
                <p className = 'tit'>
                    <span className = 'titname'>{data.name}</span>
                    <span className = 'iconfont'>&#xe66e;</span>
                </p>
                <br/>
                <p className = 'thingprice'>
                    <span>￥<i>{data.vipshopPrice}</i></span>
                    <del>￥{data.marketPrice}</del>
                </p>
                <div className = 'pms'>
                    <li>
                          <i className = 'mode'>{type}</i>
                          <p className = 'txt'>{msg}</p>
                    </li>
                   
                </div>
            </div>
        </div>
      )

      for(var j in data1){
          arr1.push(
          <li key = {j}>
            <span className = 'nnn'>{data1[j].name}</span>
            <span className = 'vvv'>{data1[j].value}</span>
          </li>
        )
      }
      
    return(
      <div className = 'type3' id = 'con'>
        <span className = 'cover'>
						该商品已经添加购物车
				</span>
        {arr}
        <div id = 'shopxinxi'>
          <p className = 'instros'>
            <span className = 'foo' onClick = {this.shopshow.bind(this)}>商品信息</span>
            <span className = 'shuoming' onClick = {this.shophide.bind(this)}>购物说明</span>
          </p>
          <ul id = 'shopxin'>
              {arr1}
          </ul>
              <div className = 'txts'>
                <li>
                  <h2>关于商品</h2>
                   <p>乐蜂展示的中间未划横线价格（显示如¥799）为乐蜂销售价，该价格是交易成交价，是您最终决定是否购买商品的依据。</p>
                </li>
                 <li>
                   <h2>
                     商品价格说明
                   </h2>
                    <p>乐蜂展示的中间划横线价格（显示如￥1399）为参考价，采集自品牌专柜标价、商品吊牌价或由品牌供应商提供的正品零售价；由于地区、时间的差异性和市场行情波动，品牌专柜标价、商品吊牌价可能会与您购物时展示的不一致。该价格仅供您参考。</p>
                 </li>
                 
                <li>
                  <h2>
                    售后说明
                  </h2>
                  <p>折扣比为乐蜂销售价与参考价的对比（该值四舍五入后采用小数点后1位，如¥799/¥2899=0.2756=2.8折），该对比值仅供您参考，不作为结算基数。</p> 
                </li>
                 
              </div>
          
          
        </div>
        <div id = 'cart'>
            <i className = 'iconfont' id = 'iconfont' onClick = {this.showcart.bind(this)}>&#xe639;</i>
            <a href = 'javascript:;' className = 'goshop' onClick = {this.addcart.bind(this)}>加入购物车</a>
        </div>
      </div>
    )
  }
}
