<template>
	<view class="content">
		<view>
			<view class="shop-title">
			麻辣烫<img src="../../static/images/icon_betweenBack.png" @click="toList()">
			</view>
		</view>
		<view class="uni-flex uni-row">
			<view class="flex-item left-part" @click="toPay()">
				<img src="../../static/images/icon_pay.png">买单
			</view>
			<view class="flex-item right-part" @click="toScanCode()">
				<img src="../../static/images/icon_ma.png">扫码点餐
			</view>
		</view>
		<view @click="toGetLocation()" class="address">
			<img src="../../static/images/icon_address.png">
			<!-- {{address}} -->
			北京朝阳123麻辣烫
		</view>
		<view class="card-box">
			<view class="my-coupon" @click="toMyCoupon()">
				<view>
					<span class="card-title">我的优惠券</span>
					<span>优惠享不停</span>
				</view>
				<img src="../../static/images/icon_coupon.png">
			</view>
			<view class="my-card" @click="toMyCard()">
				<view>
					<span class="card-title">我的会员卡</span>
					<span>尊享更多会员特权</span>
				</view>
				<img src="../../static/images/icon_card.png">
			</view>
		</view>
		<view class="free-coupon">
			<span class="free">免费领券</span>
			<view class="coupon01" v-for="item in list" :key="key">
				<view class="coupon-img"><i>{{item.couponMoney}}</i>元</view>
				<view class="coupon-txt">
					<p class="txt">{{item.couponTxt}}</p>
					<p class="use">{{item.couponUse}}</p>
					<p class="time">{{item.couponTime}}</p>
				</view>
				<view class="coupon-btn">
					<span>领取</span>
				</view>
			</view>
		</view>
		<view class="con-card">
			<view class="card blue">
				<view class="card-left">
					<p class="card-name">测试储蓄卡</p>
					<p class="card-value">面值1.00元</p>
				</view>
				<view class="card-btn">
					<span>购买</span>
				</view>
				<span class="trangle">赠100元</span>
			</view>
			<view class="card yellow">
				<view class="card-left">
					<p class="card-name">测试储蓄卡</p>
					<p class="card-value">面值200.00元</p>
				</view>
				<view class="card-btn">
					<span>购买</span>
				</view>
				<span class="trangle">赠20元</span>
			</view>
		</view>
	</view>
</template>

<script>
	import tabBar from '../components/tabBar'
	export default {
		data() {
			return {
				title: '',
				address:'',
				list:[      // 免费领券
					{'couponMoney':'10','couponTxt':'条件优惠券','couponUse':'满20使用','couponTime':'2019-04-09-2025-04-10'},
					{'couponMoney':'10','couponTxt':'10元代金券','couponUse':'无门槛','couponTime':'2019-04-09-2022-04-10'}
				],
				hasSetBg:false
			}
		},
		components:{
			tabBar
		},
		onLoad(options) {
			this.address = uni.getStorageSync('address');
			uni.removeStorageSync('address');
			this.title = uni.getStorageSync('title');
			uni.removeStorageSync('title');
			console.log(this.title);
			this.setBg();
		},
		methods: {
			setBg() {
				this.hasSetBg = !this.hasSetBg;
				uni.setNavigationBarColor({
					frontColor: this.hasSetBg ? "#ffffff" : "#000000",
					backgroundColor: this.hasSetBg ? "#46B2FF" : "#F8F8F8"
				})
			},
			toGetUserInfo(){  // 获取用户信息
				uni.navigateTo({
					url:'../API/get-user-info/get-user-info'
				})
			},
			toGetLogin(){   // 授权登录
			},
			toList(){  // 返回门店列表
				uni.redirectTo({
					url:'../index'
				});
				uni.hideTabBar();
			},
			toClickMenu(){  // 去点餐
				console.log('去点餐');
				uni.navigateTo({
					url:'../shopMall/index'
				})
			},
			toPay(){  // 去买单
				console.log('去买单');
				uni.switchTab({
					url:'../check/index'
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
			getVal(msg){
				cosnole.log(msg);
			},
			toScanCode(){
				uni.scanCode({
					success: function (res) {
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			},
			toGetLocation(){
				uni.getLocation({
					type: 'wgs84',
					success: function (res) {
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			toMyCoupon(){   // 去我的优惠券
				uni.navigateTo({
					url:'../my/coupon'
				})
			},
			toMyCard(){   // 我的会员卡
				uni.navigateTo({
					url:'../my/card'
				})
			}
		}
	}
</script>

<style>
	.address{
		padding:10px 15px;
		font-size: 18px;
		background: #FFFFFF;
		margin-bottom: 2px;
	}
	.address img{
		width: 28px;
		height: 28px;
		margin-right: 5px;
		vertical-align: middle;
	}
	.shop-title{
		font-size: 25px;
		text-align: center;
		background: #46B2FF;
		margin-top: -1px;
		color:#fff;
		font-size: 26px;
	}
	.shop-title img{
		width: 32px;
		height: 32px;
		vertical-align: middle;
		margin-left: 10px;
	}
	.uni-row{
		background:rgba(70,178,255,1) ;
		padding-top: 20px;
		margin-top: -1px;
	}
	.flex-item {
		width: 45%;
		margin:2%;
		height: 60px;
		text-align: center;
		line-height: 60px!important;
		display:inline-block;
	}
	.left-part,.right-part{
		background: rgba(255,255,255,.3);
		border-radius: 10px;
		color:#fff;
		font-size: 20px;
	}
	.left-part img,.right-part img{
		width: 53px;
		height: 32px;
		vertical-align: middle;
	}
	.right-part img{
		width: 32px;
		margin-right: 10px;
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
	.icon-back{
		width: 40px;
		height: 40px;
	}
	.card-box{
		display: flex;
		background: #fff;
		padding:0 15px;
		margin-bottom: 10px;
		
	}
	.card-box .card-title{
		width: 100%;
		display: block;
		font-size: 16px;
		font-weight: bold;
		color:#000;
	}
	.card-box span{
		color:#999999;
		line-height: 24px;
	}
	.my-coupon{
		padding:10px;
		padding-left: 5px;
		flex: 6;
		font-size: 12px;
		position: relative;
		border-right: 1px solid #F5F5F5;
	}
	.my-coupon img,.my-card img{
		width:32px;
		height: 32px;
		position: absolute;
		right:10px;
		top:10px;
	}
	.my-card img{
		right: 5px;
	}
	.my-card{
		padding:10px;
		flex: 6;
		position: relative;
	}
	.free-coupon{
		padding:0 20px;
		padding-bottom: 10px;
		box-sizing: border-box;
		height: auto;
		background: #fff;
	}
	.free-coupon .free{
		font-size: 20px;
		display: block;
		font-weight: bold;
		padding:10px 0;
	}
	.coupon01{
		width:100%;
		background: #F5F5F5;
		display: flex;
		border-radius: 8px;
		margin-top: 10px;
	}
	.coupon01 .coupon-img{
		flex: 3;
		color:#fff;
		font-size: 14px;
		text-align: center;
		background:#FD6472;
		line-height: 100px!important;
		border-radius: 8px 0 0 8px;
	}
	.coupon01 .coupon-img i{
		font-size: 20px;
		font-style: normal;
		display: inline-block;
	}
	.coupon01 .coupon-txt{
		flex: 7;
		text-indent: 16px;
		box-sizing: border-box;
	}
	.coupon01 .coupon-btn{
		flex: 2;
	}
	.coupon01 .coupon-btn span{
		width:90%;
		height: 24px;
		display: block;
		line-height: 24px;
		text-align: center;
		border-radius: 15px;
		border:1px solid #FF0000;
		color:#FF0000;
		margin-top: 35px;
	}
	.coupon01 p{
		line-height: 25px;
	}
	.coupon01 .txt{
		color: #000;
		padding-top: 12px;
	}
	.coupon01 .use{
		color: #FF0000;
	}
	.coupon01 .time{
		color: #9A9A9A;
	}
	.con-card{
		margin:0 20px;
	}
	.card{
		position: relative;
		display: flex;
		border-radius: 8px;
		color:#FFFFFF;
		padding-left: 20px;
		overflow: hidden;
		margin-bottom: 20px;
	}
	.blue{
		background:#5578CA;
	}
	.yellow{
		background: #E4B138;
	}
	.card .trangle{
		width: 120px;
		height: 30px;
		display: block;
		text-align: center;
		line-height: 30px;
		background: #FFDB32;
		color:#000;
		transform: rotate(45deg);
		position: absolute;
		right: -32px;
		top: 10px;
	}
	.card-left{
		flex: 9;
	}
	.card-left .card-name{
		font-size: 14px;
		padding-top: 30px;
		padding-bottom: 20px;
	}
	.card-left .card-value{
		font-size: 22px;
		padding-bottom: 30px;
	}
	.card-btn{
		flex: 3;
	}
	.card-btn span{
		width:75px;
		height: 30px;
		display: block;
		text-align: center;
		line-height: 30px!important;
		border-radius: 20px;
		background: rgba(255,255,255,.4);
		position: absolute;
		bottom: 20px;
		right: 10px;
	}
</style>
