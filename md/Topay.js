import React from 'react';
import ReactDOM from 'react-dom';
import {hashHistory} from 'react-router';

export default class Topay extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:[],
            IDcard:[],
            Tel:[],
            time:[],
            province1:[],
            city1:[],
            district1:[],
            detailDistrict:[]
        }
    }
   componentWillMount(){
       var that = this;
        var str = localStorage.getItem('custromInfo');
        console.log(str)
        var obj = JSON.parse(str);
        console.log(obj)
        that.setState({
            name:obj.custromName,
            IDcard:obj.IDcard,
            Tel:obj.Tel,
            time:obj.time,
            province1:obj.province1,
            city1:obj.city1,
            district1:obj.district1,
            detailDistrict:obj.detailDistrict
        })
   }

   goback(){
       window.history.go(-1);
   }
    render(){
        var that = this;
        var name = that.state.name;
        var IDcard = that.state.IDcard;
        var Tel = that.state.Tel;
        var time = that.state.time;
        var province1 = that.state.province1;
        var city1 = that.state.city1;
        var district1 = that.state.district1;
        var detailDistrict = that.state.detailDistrict;
        var arr = [];
        arr.push(
            <li key = {1}>
                <div className = 'nameandphone'>
                    <span>{name}</span>
                    <span>{Tel}</span>
                </div>
                <p>
                   {province1}.{city1}.{district1}.{detailDistrict}
                </p>
            </li>
        )

        return(
            <div className = 'type'>
                <header id = 'header'>
                    <i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
                    <div className = 'title'>
                        结算
                    </div>
                </header>
                <div className = 'content'>
                        <div className = 'info'>
                            <h2>
                                收货信息
                            </h2>
                            <ul id = 'information'>
                                {arr}
                            </ul>
                        </div>
                        <div className = 'topay'>
                            <h2>支付方式</h2>
                            <ul>
                                <li>
                                    <input type = 'radio' name = 'pay'/>
                                    <p>
                                        <span>花粉</span>
                                        <span>暂不满足使用</span>
                                    </p>
                                </li>
                                <li>
                                    <input type = 'radio' name = 'pay' />
                                    <p>支付宝网页版</p>
                                </li>
                                <li>
                                    <input type = 'radio' name = 'pay' />
                                    <p>银行卡支付</p>
                                </li>
                            </ul>
                        </div>
                        
                    </div>
                    <div className = 'paymoney'>
                             <span>
                                去支付    
                             </span>   
                    </div>  
            </div>
        )
    }
}