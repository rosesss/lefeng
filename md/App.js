import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,Link,hashHistory,IndexRoute} from 'react-router';

export default class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div id = 'container'>
                {this.props.type}    
            </div>
        )
    }
}