<template>
	<view class="container">
		<view class="top-fixed">
			<view class="page-top">
				<view class="flex-item01">
					<img src="../../static/images/icon.jpg">
				</view>
				<view class="flex-item02">
					<view class="city">辽宁省沈阳市浑南区</view>
					<view class="address">君汇中心B座辽宁省沈阳市浑南区辽宁省沈阳市浑南区</view>
				</view>
				<view class="flex-item03">
					<view>
						<span>食堂</span>
						<span>外卖</span>
					</view>
				</view>
			</view>
			<view class="coupon">
				<view class="txt">您有专属的优惠券待领取</view>
				<view class="btn"><span>领取</span></view>
			</view>
			<view class="empty"></view>
		</view>
		<view class="content">
			<view class="left-menu">
				<ul>
					<li v-for="(item,key) in menuList" :class="{'active':item.isShow}" @click="toChange(key)" :key="key">
					{{item.title}}
					</li>
					<!-- <li class="active">面条</li>
					<li>饮料</li>
					<li>凉菜</li> -->
				</ul>
			</view>
			<view class="right-detail">
				<view class="menu">
					<view class="menu-tit">面条</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<!--  -->
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
				</view>
				<view class="menu">
					<view class="menu-tit">小菜</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<!--  -->
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
				</view>
				<view class="menu">
					<view class="menu-tit">酒水</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<!--  -->
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
					<view class="menu-detail">
						<view class="food-img">
							<img src="../../static/images/icon.jpg">
						</view>
						<view class="food-detail">
							<view class="food-name">牛肉面</view>
							<view class="food-description">牛肉面简介</view>
							<view class="food-description"><span class="sail-quality">销售量<i>8</i></span><span class="save-quality">库存<i>388</i></span></view>
							<view class="food-price">￥<span>0.01</span></view>
						</view>
						<view class="menu-add">
							<img src="../../static/images/icon_add.png">
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="fix-cart">
			<view class="cart-part">
				<span><img src="../../static/images/icon_cart.png"></span>
			</view>
			<view class="cart-price">￥<span>0</span></view>
			<view class="cart-btn red">去结算</view>
		</view>
		<button @click="back()" style="margin-bottom: 40px;">返回</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				msg:'',
				hasSetBg:false,
				menuList:[
					{'title':'面条','isShow':true},
					{'title':'小菜','isShow':false},
					{'title':'酒水','isShow':false}
				]
			}
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: '点餐页面'
			});
			uni.hideTabBar();
		},
		onLoad(){
			this.setBg();
		},
		methods: {
			back(){
				uni.switchTab({
					url:'../home/home'
				})
				uni.showTabBar();
			},
			setBg() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#000000",
					backgroundColor: this.hasSetBg ? "#DE2A34" : "#F8F8F8"
				})
			},
			toChange(key){   // 点击选菜栏
				console.log(key);
				var titsDom = document.getElementsByClassName('menu-tit');
				for(var i = 0;i<this.menuList.length;i++){
					this.menuList[i].isShow = false;
					this.menuList[key].isShow = true;
				}
				document.documentElement.scrollTop = titsDom[key].offsetTop - 130;
			}
		}
	}
</script>

<style>
	uni-page-head uni-page-head .uni-page-head-hd{
		visibility: visible!important;
	}
	.container .fix-cart{
		width: 100%;
		height: 50px;
		/* background: #2C2C2C; */
		background: rgba(0,0,0,.9);
		position: fixed;
		left: 0;
		bottom:-1px;
		z-index: 100;
	}
	.content{
		padding-top: 130px;
	}
	.top-fixed{
		width:100%;
		position: fixed;
		top:2px;
		z-index: 100;
	}
	.page-top{
		width: 100%;
		display: flex;
		background: #DE2A34;
		padding:0 15px;
		margin-top: -2px;
		height: 60px;
	}
	.flex-item01{
		flex: 2;
	}
	.flex-item01 img{
		width: 50px;
		height: 50px;
		border-radius: 5px;
	}
	.flex-item02{
		flex: 7;
		text-indent: 10px;
		overflow: hidden;
	}
	.flex-item02 .city{
		color:#FFFFFF;
		font-weight: bold;
		font-size: 16px;
		width: 100%;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.flex-item02 .address{
		color:#efefef;
		font-size: 14px;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.flex-item03{
		flex: 3;
	}
	.coupon{
		display: flex;
		height: 60px;
		background:#FFFFFF;
		padding:0 15px;
	}
	.coupon view{
		line-height: 60px!important;
	}
	.empty{
		height: 11px;
		margin-top: -1px;
		background: #F4F5F6;
	}
	.coupon .txt{
		flex: 9;
	}
	.coupon .btn{
		flex: 3;
		text-align: center;
	}
	.coupon .btn span{
		padding:8px 20px;
		border-radius: 20px;
		background: #FDD80E;
	}
	.left-menu{
		width: 20%;
		position: fixed;
	}
	.right-detail{
		width:80%;
		height: auto;
		margin-left: 20%;
		padding:0 10px;
		box-sizing: border-box;
		background: #fff;
	}
	.left-menu ul{
		margin:0;
		padding:0;
		border:0;
		list-style:none;
	}
	.left-menu ul li{
		width: 100%;
		height: 40px;
		line-height: 40px!important;
		text-align: center;
	}
	.left-menu ul li.active{
		background: #FFFFFF;
	}
	.right-detail .menu-tit{
		height: 40px;
		line-height: 40px!important;
		color:#6A6A6A;
	}
	.menu-detail{
		display: flex;
		padding-bottom: 20px;
		height: 110px;
	}
	.menu-detail .food-img{
		flex: 3;
		line-height: 100px!important;
	}
	.menu-detail .food-detail{
		flex: 8;
	}
	.food-detail .food-price,.food-detail .food-name,.food-detail .food-description{
		line-height: 1.6!important;
	}
	.menu-detail .food-detail .food-name{
		font-size: 18px;
		font-weight: bold;
	}
	.menu-detail .food-detail .food-description{
		color:#BCBCBC;
		font-size: 13px;
		display: block;
	}
	.sail-quality i,.save-quality i{
		font-style: normal;
		margin-right: 4px;
		margin-left: 2px;
		display: inline-block;
	}
	.menu-detail .food-detail .food-price{
		font-size: 18px;
		color:#DE2A34;
		font-weight: bold;
		padding-top: 5px;
	}
	.menu-detail .menu-add{
		flex: 1;
	}
	.menu-add img{
		width: 32px;
		height: 32px;
		margin-top: 65px;
	}
	.menu .food-img img{
		width: 80px;
		height: 80px;
		border-radius: 5px;
		margin-right:10px;
		vertical-align: middle;
	}
	.fix-cart{
		display: flex;
		color:#FFFFFF;
	}
	.cart-part{
		width: 50px;
		height: 50px;
		line-height: 50px!important;
		flex: 3;
		text-align: center;
	}
	.cart-part span{
		position: relative;
		top:-10px;
		width: 50px;
		height: 50px;
		display: block;
		background: #353535;
		margin:0 auto;
		border-radius: 50%;
		line-height: 50px;
	}
	.cart-part img{
		width: 32px;
		height: 32px;
		vertical-align: middle;
	}
	.cart-btn{
		flex: 3;
		background: #2C2C2C;
		text-align: center;
		font-size: 20px;
		line-height: 50px!important;
	}
	.cart-price{
		flex: 4;
		font-size: 25px;
		line-height: 50px!important;
	}
	.red{
		background: #DE2A35;
	}
</style>
