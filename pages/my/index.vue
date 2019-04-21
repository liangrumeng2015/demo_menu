<template>
	<view class="container">
		<view>
			<view class="box">
				<view class="part-name">
					<img class="icon-my" src="../../static/images/icon.jpg">
					<view class="name-icon">Grace昵称</view>
				</view>
				<view class="part-code">
					<img @click="toGetPhone()" src="../../static/images/icon_code.png">
				</view>
			</view>
		</view>
		<view class="card-order">
			<view class="title">
				<h3>我的订单</h3>
				<span class="look-order" @click="toAllOrder(0)">
					查看全部订单<img src="../../static/images/icon_next.png">
				</span>
			</view>
			<view class="uni-flex uni-row list-item">
				<view class="flex-item" @click="toAllOrder(1)">
					<img src="../../static/images/icon_money.png">
					<span>待支付</span>
				</view>
				<view class="flex-item" @click="toAllOrder(2)">
					<img  src="../../static/images/icon_give.png">
					<span>待配送</span>
				</view>
				<view class="flex-item" @click="toAllOrder(3)">
					<img  src="../../static/images/icon_get.png">
					<span>待收货</span>
				</view>
			</view>
		</view>
		<view class="uni-flex uni-row list-item list-item2">
			<view class="flex-item" @click="toCoupon()">
				<span class="num">0</span>
				<span>优惠券</span>
			</view>
			<view class="flex-item" @click="toMoney()">
				<span class="num">0.00</span>
				<span>余额</span>
			</view>
			<view class="flex-item" @click="toScore()">
				<span class="num">0</span>
				<span>积分</span>
			</view>
			<view class="flex-item" @click="toGifts()">
				<span class="num">0</span>
				<span>赠品</span>
			</view>
		</view>
		<view class="con">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" @click="toAddress()">
						<view class="uni-media-list-logo">
							<image src="../../static/images/icon_address.png"></image>
						</view>
						<view class="uni-media-list-body">
							地址管理
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list uni-list-top">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-logo">
							<image src="../../static/images/icon_share.png"></image>
						</view>
						<view class="uni-media-list-body" @click="toShare()">
							分享店铺
						</view>
					</view>
				</view>
			</view>
		</view>
		<button @click="toLogin()">登录</button>
		<button @click="toGetUserInfo()">获取用户信息</button>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">获取电话号码</button>
		<button @click="toGetLocation()">获取定位</button>
	</view>
</template>

<script>
	import tabBar from '../components/tabBar'
	export default{
		data(){
			return{
				msg:'',
				hasSetBg:false
			}
		},
		components:{
			tabBar
		},
		onLoad(){
			this.setBg();
		},
		methods:{
			getPhoneNumber(){
				
			},
			toLogin(){   // 登录
				uni.navigateTo({
					url:'../API/login/login'
				})
			},
			toGetUserInfo(){  // 获取用户信息
				uni.navigateTo({
					url:'../API/get-user-info/get-user-info'
				})
			},
			toGetLocation(){
				uni.navigateTo({
					url:'../API/choose-location/choose-location'
				})
			},
			setBg() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#000000",
					backgroundColor: this.hasSetBg ? "#007AFF" : "#F8F8F8"
				})
			},
			toGetPhone(){
				console.log('要去获取用户的手机号');
				uni.navigateTo({
					url:'../API/get-user-info/get-user-info'
				})
			},
			toClickMenu(){  // 去点餐
				console.log('去点餐');
				uni.navigateTo({
					url:'../shopMall/index'
				})
			},
			toPay(){  // 去买单
			console.log('去买单');
				uni.navigateTo({
					url:'../API/request-payment/request-payment'
				})
			},
			toMy(){
				uni.navigateTo({
					url:'../my/index'
				})
			},
			toHome(){
				uni.navigateTo({
					url:'../home/home'
				})
			},
			toAllOrder(key){
				uni.navigateTo({
					url:'./orderList?id='+key
				})
			},
			toShare(){
				uni.share({
					provider: "weixin",
					scene: "WXSceneSession",
					type: 1,
					summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
					success: function (res) {
						console.log("success:" + JSON.stringify(res));
					},
					fail: function (err) {
						console.log("fail:" + JSON.stringify(err));
					}
				});
			},
			toGifts(){  // 赠品
				uni.navigateTo({
					url:'./gifts'
				})
			},
			toScore(){  // 积分
				uni.navigateTo({
					url:'./score'
				})
			},
			toMoney(){   // 账户余额
				uni.navigateTo({
					url:'./money'
				})
			},
			toCoupon(){
				uni.navigateTo({
					url:'./coupon'
				})
			},
			toAddress(){
				uni.navigateTo({
					url:'./address'
				})
			}
		}
	}
</script>

<style>
	.container{
		background:rgb(0, 122, 255);
		height: 140px;
	}
	.title{
		height: 40px;
		
		border-bottom: 1px solid #C8C7CC;
	}
	.title h3{
		line-height: 39px!important;
		padding-left: 15px;
		box-sizing: border-box;
		display: inline-block;
	}
	.title .look-order{
		line-height: 39px;
		display: inline-block;
		float: right;
		font-size: 12px;
		color:#707070;
		padding-right: 10px;
	}
	.title .look-order img{
		width: 16px;
		height: 16px;
		line-height: 39px;
		vertical-align: middle;
		padding-left: 5px;
	}
	.box{
		display: flex;
		line-height: 50px;
		padding-top: 10px;
		margin:0 10px;
	}
	.box .part-name{
		flex: 9;
	}
	.box .part-code{
		flex: 2;
	}
	.box .part-code img{
		padding-top: 10px;
		width: 28px;
		height: 28px;
	}
	.card-order{
		width: 95%;
		box-sizing: border-box;
		background: #fff;
		border-radius: 8px;
		margin-top: 20px;
		position: absolute;
		left: 50%;
		top:60px;
		transform: translateX(-50%);
	}
	.list-item{
		padding-top: 15px;
		padding-bottom: 10px;
	}
	.list-item2{
		margin:0 10px;
		margin-top: 170px;
		background: #fff;
		border-radius: 8px;
		padding-top: 0;
	}
	.flex-item {
		width: 31%;
		margin:1%;
		height: auto;
		text-align: center;
		display:inline-block;
	}
	.flex-item  span{
		height: 25px;
		display: block;
		margin-top: 10px;
		color:#707070;
	}
	.flex-item img{
		width: 28px;
		height: 28px;
	}
	.flex-item span.num{
		font-weight: bold;
		font-size: 20px;
		line-height: 25px;
		margin-bottom: 10px;
		color:#000;
	}
	.icon-my{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		vertical-align: middle;
		margin-right: 5px;
	}
	.name-icon{
		display: inline-block;
	}
	.tabbar-nav{
		width: 100%;
		position: fixed;
		bottom:0;
		left: 0;
		display: flex;
		background:#fff;
		border-top: 1px solid #C8C7CC;
		padding-top: 5px;
	}
	.tabbar-nav .flex-item1{
		width:25%;
		text-align: center;
	}
	.tabbar-nav .flex-item1 span{
		display:block;
	}
	.tabbar-nav .flex-item1 img{
		width:28px;
		height: 28px;
	}
	.con{
		margin:0 10px;
		margin-top: 20px;
	}
	.uni-list-cell-navigate,.uni-media-list{
		padding:0!important;
	}
	.uni-media-list-body{
		line-height: 42px!important;
	}
	.uni-media-list-logo{
		line-height: 42px;
		text-align: center;
		margin-right: 0!important;
	}
	.uni-media-list-logo image{
		width: 20px;
		height: 20px;
		padding-top: 12px;
	}
	.uni-list::before,.uni-list::after{
		background: none!important;
	}
	.uni-list-top{
		border-top: 1px solid #F4F5F6;
	}
</style>
