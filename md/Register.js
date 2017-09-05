import React from 'react';
import { hashHistory } from 'react-router';
export default class Register extends React.Component{
    constructor(props){
        super(props);
       this.state={
           userflag:false,
           psdflag:false
       }
    }
    componentWillUnmount() {
        clearTimeout(timer)
    }
    backBeforePag(){
        window.history.go(-1)
    }

    getInfo(){
        var that = this;
        var username = $('.username').val();
        var password = $('.password').val();
        if(username == '' || password == ''){
                $('.logintoast').html('请按照要求输入正确的用户名和密码');
                $('.logintoast').css('display', 'block')
                var timer = setTimeout(function() {
                    $('.logintoast').css('display', 'none')
                }, 2000)
		}
        var obj = {
            username:username,
            password:password
        }
        var objStr = JSON.stringify(obj)
        
        var userflag = that.state.userflag;
        var psdflag = that.state.psdflag;
        
        if(userflag && psdflag){
          
           var findstr = localStorage.getItem(username);
            if(findstr == null) {
                    localStorage.setItem(username, objStr);
                    $('.toast').html('注册成功');
                    $('.toast').css('display', 'block');
                   
                    var timer = setTimeout(function() {
                        $('.toast').css('display', 'none') 
                        hashHistory.push({
                            pathname:'user'
                        });
                    }, 2000);
                }else {
                    $('.toast').html('该手机号已经注册了');
                    $('.toast').css('display', 'block')
                    var timer = setTimeout(function() {
                        $('.toast').css('display', 'none')
                    }, 2000)
                }
        }
     
       

    }

    usernameblur(){
        var that = this;
         var username = $('.username').val();
         if(!/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(username)){
            $('.toast').html('请输入正确的手机号码');
            $('.toast').css('display', 'block');
            var timer = setTimeout(function() {
                $('.toast').css('display', 'none')
                $('.toast').html('');
            }, 2000);
           that.setState({
                userflag:false
            })
       }else{
            $('.toast').css('display', 'none');
            that.setState({
                userflag:true
            })
       }

    }
    psdblur(){
        var that = this;
        var password = $('.password').val();
        if(!/^\d{6,}$/.test(password)){
            $('.toast').html('密码为6位数字');
            $('.toast').css('display', 'block');
            var timer = setTimeout(function() {
                $('.toast').css('display', 'none')
            }, 2000);
            that.setState({
                psdflag:false
            })
        }else{
             $('.toast').css('display', 'none');
             that.setState({
                psdflag:true
            })
        }
    }
    render(){

        return (
            <div id='container'>
               <div className='type'>
                   <header id="header">
                       <div id='registerHeader'>
                           <span className='iconfont' onClick={this.backBeforePag.bind(this)}>&#xe664;</span>
                           <span className='register'>注册</span>
                           <span className='hidden'></span>
                       </div>
                   </header>
                   <div id='con1'>
                       <form className='registerfrom'>
                           <input type="text" onBlur={this.usernameblur.bind(this)} className='username' placeholder='请输入手机号/邮箱' />
                           <input type="password"onBlur={this.psdblur.bind(this)} className='password' placeholder='请输入6位数字'/>
                          <div className = 'kong'></div>
                           <button className='registerBtn' onClick={this.getInfo.bind(this)}>点击注册</button>
                       </form>
                       <span className='toast'></span>
                   </div>
               </div>
              
            </div>
        )
    }

}