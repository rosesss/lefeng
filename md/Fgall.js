import React from 'react';
import {hashHistory} from 'react-router';

export default class Fgall extends React.Component{
    constructor(props){
        super(props);
    }

    componentWillMount(){

    }
    goback(){
        window.history.go(-1);
    }
    render(){
        return (
            <div className = 'type'>
                <header id = 'header'>
                    <i className = 'iconfont' onClick = {this.goback.bind(this)}>&#xe664;</i>
                    <div className = 'title'>蜂购全球</div>
                </header>
                <div id = 'content'>
                    <div className = 'img'>
                        <img src = '../img/fg.jpg' />
                    </div>
                </div>
            </div>
        )
    }
}