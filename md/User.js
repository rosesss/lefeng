import React from 'react';
import ReactDOM from 'react-dom';
import {Link,hashHistory} from 'react-router';

export default class Login extends React.Component{
    constructor(props){
        super(props);
        this.state={
           loginuserflag:false,
           loginpsdflag:false
       }
    }
   
    backBeforePag(){
        window.history.go(-1)
    }
    backHome(){
       hashHistory.push({
			pathname:'/'
		})
    }
    loginBtn(){
        var backCartNum= this.props.location.query.backCart;
        var that = this;
        var username = $('.username').val();
		var password = $('.password').val();
		if(username == '' || password == ''){
                $('.logintoast').html('请输入正确的用户名密码');
                $('.logintoast').css('display', 'block')
                var timer = setTimeout(function() {
                    $('.logintoast').css('display', 'none')
                }, 2000)
		}
        var loginuserflag= that.state.loginuserflag;
        if(loginuserflag){
             var username = $('.username').val();
             var password = $('.password').val();
             var loginstr = localStorage.getItem(username);
             var loginobj = JSON.parse(loginstr)
            if(loginstr == null) {
                $('.logintoast').html('该账户未注册');
                $('.logintoast').css('display', 'block')
                var timer = setTimeout(function() {
                    $('.logintoast').css('display', 'none')
                }, 2000)
            }else if(password != loginobj.password) {
                    $('.logintoast').html('你的密码错误');
                    $('.logintoast').css('display', 'block')
                    var timer = setTimeout(function() {
                        $('.logintoast').css('display', 'none')
                    }, 2000)
                }else {
                    $('.logintoast').html('登录成功');
                    $('.logintoast').css('display', 'block');
                    localStorage.setItem('hadlogin', 'success');
                    var timer = setTimeout(function() {
                        $('.logintoast').css('display', 'none');
                            hashHistory.push({
                                pathname:'/'
                            })
                    }, 2000)
                }

        }

    }
    usernameblur(){
        var that = this;
        var username = $('.username').val();
        if(!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(username)){
            console.log('err')
            $('.logintoast').html('请输入正确的手机号');
            $('.logintoast').css('display', 'block')
            var timer = setTimeout(function() {
                $('.logintoast').css('display', 'none')
            }, 2000)
            that.setState({
                loginuserflag:false
            })
        }else{
           $('.logintoast').css('display', 'none')
            that.setState({
                loginuserflag:true
            })
        }
    }
    passwordblur(){
        var password = $('.password').val();

    }
    render(){
        return(
               <div className='type'>
                   <header id="header">
                       <div id='loginheader'>
                           <span className='backBeforePag' onClick={this.backBeforePag.bind(this)} className = 'iconfont'>&#xe664;</span>
                           <span className = 'tologin'>登陆</span>
                           <span id='backHome' onClick={this.backHome.bind(this)} className = 'iconfont'>&#xe60c;</span>
                       </div>
                   </header>
                   <div id='con1'>
                       <form className='loginform'>
                            <input type="text" className='username' onBlur={this.usernameblur.bind(this)} placeholder='已验证的手机/手机号/邮箱'/>
                            <input type="password" className='password' onBlur={this.passwordblur.bind(this)} placeholder='密码'/>
                            <input type="checkbox" className='freelogin'/>
                            <span className='freetet'>一周内免登陆</span>
                            <button className='loginbtn' onClick={this.loginBtn.bind(this)}>登陆</button>
                            <Link className='goRegister' to='register'>
                            立即注册</Link>
                             <Link className='forgetPsd' to='forgetpsd'>
                            忘记密码</Link>
                       </form>
                       <span className='logintoast'></span>
                   </div>
               </div>
        )
    }
}