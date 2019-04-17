<template>
	<!-- 
	 1.获取用户信息   接口-登录-获取用户信息   （头像和昵称）
2.获取手机号
3.获取通讯地址  
4.获取手机定位  

第一步框架要包括上面的功能
第二步就是页面细节，比如页面跳转，弹出对话框等等

付款
	 -->
	<view class="content">
		<view>{{title}}</view>
		<img src="../../static/images/icon_home.png" @click="toList()" class="icon-back">返回的门店列表的
		<view class="uni-flex uni-row">
			<view class="flex-item left-part" @click="toPay()">买单</view>
			<view class="flex-item right-part" @click="toScanCode()">扫码点餐</view>
		</view>
		<view @click="toGetLocation()">{{address}}</view>
		
		<!-- <tabBar @getMessage="getVal()"></tabBar> -->
		<view class="tabbar-nav">
			<view class="flex-item1">
				<img src="../../static/images/icon_home.png">
				<span>首页</span>
			</view>
			<view class="flex-item1" @click="toClickMenu()">
				<img src="../../static/images/icon_order.png">
				<span>点餐</span>
			</view>
			<view class="flex-item1" @click="toPay()">
				<img src="../../static/images/icon_money.png">
				<span>买单</span>
			</view>
			<view class="flex-item1" @click='toMy()'>
				<img src="../../static/images/icon_my.png">
				<span>我的</span>
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
				address:''
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
		},
		methods: {
			toList(){
				uni.navigateTo({
					url:'../index'
				});
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
			}
		}
	}
</script>

<style>
	.flex-item {
		width: 45%;
		margin:2%;
		height: 200upx;
		text-align: center;
		line-height: 200upx;
		display:inline-block;
	}
	.left-part{
		background: pink;
	}
	.right-part{
		background:red;
	}
	view{
		line-height: 18px!important;
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
</style>
