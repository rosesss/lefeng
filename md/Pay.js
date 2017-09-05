import React from 'react';
import { hashHistory } from 'react-router';
import MyAjax from './MyAjax.js';

export default class Pay extends React.Component {
    constructor(props) {
        super(props);
    }
    goback() {
        window.history.go(-1);
    }

    gohome() {
        hashHistory.push({
            pathname: '/'
        })
    };
    save() {
        var custromName = $('.custromName').val();
        var IDcard    = $('.IDcard').val();
        var Tel       = $('.Tel').val();
        var time      = $('.time').val();
        var province1 = $('#province1').val();
        var city1     = $('#city1').val();
        var district1 = $('#district1').val();
        var detailDistrict = $('.detailDistrict').val();
        var obj = {
            custromName:custromName,
            IDcard:IDcard,
            time:time,
            Tel:Tel,
            province1:province1,
            city1:city1,
            district1:district1,
            detailDistrict:detailDistrict
        }
        var str = JSON.stringify(obj);
       localStorage.setItem('custromInfo',str);
       hashHistory.push({
           pathname:'topay'
       })
    }
    componentDidMount() {
        var $distpicker = $('#distpicker');
        $distpicker.distpicker({
            province: '河南省',
            city: '郑州市',
            district: '金水区'
        });

        $('#reset').click(function () {
            $distpicker.distpicker('reset');
        });

        $('#reset-deep').click(function () {
            $distpicker.distpicker('reset', true);
        });

        $('#destroy').click(function () {
            $distpicker.distpicker('destroy');
        });

        $('#distpicker1').distpicker();

    }
    render() {
        return (
            <div className='type'>
                <header id='header'>
                    <i className='iconfont' onClick={this.goback.bind(this)}>&#xe664;</i>
                    <div className='title'>
                        新增地址
                    </div>
                    <i className='iconfont' id='gohome' onClick={this.gohome.bind(this)}>&#xe60c;</i>
                </header>
                <div id='content'>
                    <ul id='person'>
                        <li>
                            <label>收货人</label>
                            <input className='custromName' type='text' />
                        </li>
                        <li className='card'>
                            <label>身份证</label>
                            <input className='IDcard' type='text' />
                        </li>
                        <li className='tao'>
                            当购买海淘商品时，须填写收货人身份证信息
                        </li>
                        <li>
                            <label>手机号</label>
                            <input className='Tel' type='text' />
                        </li>
                        <li>
                            <label>收货时间</label>
                            <select className='time'>
                                <option>收货时间不限</option>
                                <option>周六日/节假日收货</option>
                                <option>周一至周五收货</option>
                            </select>
                        </li>
                    </ul>
                    <p id='pp'></p>
                    <form className="form-inline" >
                        <div data-toggle="distpicker" id='distpicker'>
                            <ul>
                                <li>
                                    <div className="form-group">
                                        <label>省份</label>
                                        <select className="form-control" id="province1"></select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>城市</label>
                                        <select className="form-control" id="city1"></select>
                                    </div>
                                </li>
                                <li>
                                    <div className="form-group">
                                        <label>地区</label>
                                        <select className="form-control" id="district1"></select>
                                    </div>
                                </li>
                                <li>
                                    <label>详细地址</label>
                                    <input className='detailDistrict' type="text" placeholder='填写路名，门牌号，请务重复填写省市区' />
                                </li>
                            </ul>
                        </div>
                    </form>

                    <button id='keepbtn' onClick={this.save.bind(this)}>保存</button>
                </div>
            </div>
        )
    }
}