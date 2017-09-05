import React from 'react';
import {hashHistory} from 'react-router';

import MyAjax from './MyAjax.js';


export default class Searchlist extends React.Component{
      constructor(props){
        super(props);
        this.state = {
          shoplist:[]
        }
      }

      componentWillMount(){
        var that = this;
//      console.log(this.props.location.query.word)
        var a = this.props.location.query.word;

          var url = 'http://w.lefeng.com/api/neptune/search/search_by_keyword/v1?keyword='+a+'&page=1';
          MyAjax.fetch(url,function(data){
            // console.log(data.data);
            var s = data.data;
            that.setState({
                shoplist:s
            })
          },function(err){
            console.log(err)
          })
      }

      back(){
        window.history.go(-1)
      }
      tohome(){
        hashHistory.push({
          pathname:'/'
        })
      }
      toshop(gid,brandId){
        hashHistory.push({
          pathname:'detail',
          query:{
            gid:gid,
            brandId:brandId
          }
        })

      }
      render(){
          var that = this;
          var data = this.state.shoplist;
//        console.log(data)
          var arr = [];
          for(var i in data){
            arr.push(
              <li key = {i} onClick = {this.toshop.bind(this,data[i].goods.gid,data[i].goods.brandId)}>
                  <div className = 'img'>
                        <img src = {data[i].goods.image} />
                  </div>
                  <div className = 'content'>
                        <p id = 'pinpai'>{data[i].goods.brandStoreName}</p>
                        <p className = 'searchname'>{data[i].goods.name}</p>
                        <p className = 'zhekou'>{data[i].goods.agio}</p>
                        <p className = 'price'>
                          <span className = 'old'>￥{data[i].goods.vipshopPrice}</span>
                          <del className = 'new'>￥{data[i].goods.marketPrice}</del>
                          <span className = 'iconfont'>&#xe639;</span>
                        </p>
                  </div>
              </li>
            )
          }

        return(
          <div className = 'types' id = 'con'>
              <header id = 'header'>
                  <i className = 'iconfont' onClick = {this.back.bind(this)}>&#xe608;</i>
                  <div className = 'title'>
                      <i className = 'iconfont'>&#xe609;</i>
                      <input type = 'text' placeholder = '请输入要搜索的商品'/>
                  </div>
                  <i className = 'iconfont' id = 'tohome' onClick = {this.tohome.bind(this)}>&#xe617;</i>
              </header>
              <ul id = 'shoplist'>
                  {arr}
              </ul>
          </div>
        )
      }
}
