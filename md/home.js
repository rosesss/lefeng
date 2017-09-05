import React from 'react';
import './../scss/home.scss';
import MyAjax from './MyAjax.js';
import { hashHistory } from 'react-router';
export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			banner: [],
			night: [],
			baner: [],
			quanqiugou: [],
			page: 1
		
		}
	}

	componentWillMount() {
		var that = this;
		var url = 'http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=375x667&appName=lefeng_android&version=4.1.1';
		MyAjax.fetch(url, function (data) {
			that.setState({
				banner: data.data
			})
		}, function (err) {
			console.log(err)
		});

		var url = 'http://w.lefeng.com/api/neptune/brand/ad/v3?zoneId=943%2C478%2C496%2C693%2C724%2C725%2C726%2C727%2C728&resolution=375x667&appName=lefeng_android&version=4.1.1'

		MyAjax.fetch(url, function (data) {

			that.setState({
				night: data.data
			})
		}, function (err) {
			console.log(err)
		})

		var banerurl = 'http://w.lefeng.com/api/neptune/special_brands/v3?page=1&labelType=1'
		MyAjax.fetch(banerurl, function (data) {

			that.setState({
				baner: data.data[0],
				quanqiugou: data.data
			})
		}, function (err) {
			console.log(err)
		})

	}
	gohot() {
		hashHistory.push({
			pathname: '/search'
		})
	}
	gocart() {
		var isgoods = localStorage.getItem('pro');
		if(isgoods == null){
			hashHistory.push({
			 pathname: 'cart'
		    })
		}else{
			hashHistory.push({
			  pathname: 'mycart'
		    })
		}
		
	}
	goPerent() {
		var islogin = localStorage.getItem('success');
			if(islogin == null){
				hashHistory.push({
					pathname: '/user'
				})
			}else{
				hashHistory.push({
					pathname: 'percenlogin'
				})
			}
		}

		tolist(n){
			if(n == 0){
				hashHistory.push({
				pathname:'molist'
			})
			}else if(n == 1){
				hashHistory.push({
					pathname:'fgall'
				})
			}
			
		}
		golist(brandID,name){
				hashHistory.push({
					pathname:'list',
					query:{
						brandID:brandID,
						name:name
					}
				})

		}
	render() {
		var bannerdata     = this.state.banner[478];
		var homenavdata    = this.state.banner[496];
		var nightdata      = this.state.night[725];
		var lunbo2data     = this.state.banner[724];
		var globedata      = this.state.banner[727];
		var globelunbodata = this.state.banner[728];
		var banerdata      = this.state.baner;
		var banersmimg     = this.state.baner.starProductList;
		var quanqiugou     = this.state.quanqiugou;

		var arr            = [];
		var homenavarr     = [];
		var nightarr       = [];
		var lunbo          = [];
		var globe          = [];
		var globelunboarr1 = [];
		var globelunboarr2 = [];
		var globelunboarr3 = [];
		var banerarr       = [];
		var banersmimgarr  = [];
		var quanqiugouarr  = [];
		for (var i in bannerdata) {
			arr.push(<div key={i} className="swiper-slide"><img src={bannerdata[i].imgFullPath} /></div>)
		}
		for (var n in homenavdata) {
			homenavarr.push(<li key={n} onClick = {this.tolist.bind(this,n)}><img src={homenavdata[n].imgFullPath} /></li>)
		}
		for (var m in nightdata) {
			nightarr.push(<li key={m}><img src={nightdata[m].imgFullPath} /></li>)
		}
		for (var j in lunbo2data) {
			lunbo.push(<div key={j} className="swiper-slide"><img src={lunbo2data[j].imgFullPath} /></div>)
		}
		for (var k in globedata) {
			globe.push(<img key={k} src={globedata[k].imgFullPath} />)
		}
		for (var l in globelunbodata) {
			if (l < 5) {
				globelunboarr1.push(<img key={l} src={globelunbodata[l].imgFullPath} />)
			} else if (l >= 5 && l < 10) {
				globelunboarr2.push(<img key={l} src={globelunbodata[l].imgFullPath} />)
			} else {
				globelunboarr3.push(<img key={l} src={globelunbodata[l].imgFullPath} />)
			}
		}

		for (var f in banersmimg) {
			banersmimgarr.push(<div key={f} className="swiper-slide"><img src={banersmimg[f].image} />
				<span>{banersmimg[f].vipshopPrice}</span>
			</div>)
		}
		for (var g in quanqiugou) {
			if (g >= 3) {
				quanqiugouarr.push(
					<li key={g} onClick = {this.golist.bind(this,quanqiugou[g].bid,quanqiugou[g].name)}>
						<img src={quanqiugou[g].brandImage} />
						<span className='discout'>{quanqiugou[g].agio}</span>
						<span className='banername'>{quanqiugou[g].name}</span>
					</li>
				)
			}

		}
		return (
			<div className='type' id = 'type'>
				<header id="header">
					<span className='logoname'>乐蜂</span>
					<div id='search' onClick={this.gohot.bind(this)}>
						<span className='fangdajin'>&#xe607; 静家集团</span>
					</div>
					<span className='personIcon' onClick={this.goPerent.bind(this)}>&#xe644;</span>
				</header>


				<div id='content'>

					<span id='cartBtn' onClick={this.gocart.bind(this)}>&#xe639;</span>

					<div className="swiper-container" id="banner">
						<div className="swiper-wrapper">
							{arr}
						</div>
						
					</div>

					<div className='homenav'>
						<ul>
							{homenavarr}
						</ul>
					</div>

					<div className='newper'><img src='http://b.appsimg.com/2017/07/24/2212/02ca1977901017cf58e883938bd94474.jpg' /></div>

					<div className='nationgoods'><img src='http://b.appsimg.com/2017/08/04/6669/57bf8185f9c0c52a9a70998906f95c46.jpg' /></div>
					<div className='todayKing'><img src='img/11.jpg' /></div>


					<div className='lunbo'>
						<div className="swiper-container" id='lubbobox'>
							<div className="swiper-wrapper">
								{lunbo}
							</div>
						</div>

					</div>

					<ul className='right8'>
						{nightarr}
					</ul>

					<p className="globe">疯购全球</p>
					<div className='creay'>
						{globe}
					</div>

					<div className='globelunbo'>
						<div className="swiper-container" id='globelunbo'>
							<div className="swiper-wrapper">
								<div className="swiper-slide">
									<div>
										{globelunboarr1}
									</div>
								</div>
								<div className="swiper-slide">
									<div>
										{globelunboarr2}
									</div>
								</div>
								<div className="swiper-slide">
									<div>
										{globelunboarr3}
									</div>
								</div>
							</div>
							<div className="swiper-pagination"></div>
						</div>
					</div>

					<p className='baners'>品牌专场</p>

					<div className='banerbox'>
						<div className='banerwrap'>
							<img className='banerlogo' src='http://b.appsimg.com/2017/08/04/5157/1501811939019.jpg' />
							<div className='banerswiper'>
								<div className="swiper-container" id='baner'>
									<div className="swiper-wrapper" >
										{banersmimgarr}
									</div>
								</div>
							</div>

						</div>
					</div>

					<ul className='quanqiugou'>
						{quanqiugouarr}
					</ul>

				</div>
			</div>
		)
	}

	componentDidUpdate() {
		var mtswiper = new Swiper("#banner", {
			pagination: ".swiper-pagination",
			autoplay: "2000",
			loop: true,
			autoplayDisableOnInteraction: false
		})

		var swiper = new Swiper('#lubbobox', {

			slidesPerView: 3,
			paginationClickable: true,
			spaceBetween: 5,
			freeMode: true
		})

		var mySwiper = new Swiper('#globelunbo', {
			autoplay: "2000",
			loop: true,
			autoplayDisableOnInteraction: false

		})

		var banerswiper = new Swiper('#baner', {
			pagination: '.swiper-pagination',
			slidesPerView: 4,
			paginationClickable: true,
			spaceBetween: 2
		})
	}

}