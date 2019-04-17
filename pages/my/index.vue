<template>
	<view class="my-content">
		<view class="title">个人中心</view>
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
		<view>
			<view class="title">我的订单</view>
			<view class="uni-flex uni-row">
				<view class="flex-item">
					<img src="../../static/images/icon_money.png">
					<span>待支付</span>
				</view>
				<view class="flex-item">
					<img  src="../../static/images/icon_give.png">
					<span>待配送</span>
				</view>
				<view class="flex-item">
					<img  src="../../static/images/icon_get.png">
					<span>待收货</span>
				</view>
			</view>
		</view>
		<view class="tabbar-nav">
			<view class="flex-item1">
				<img src="../../static/images/icon_home.png" @click="toHome()">
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
			<view class="flex-item1">
				<img src="../../static/images/icon_my.png">
				<span>我的</span>
			</view>
		</view>
	</view>
</template>

<script>
	import tabBar from '../components/tabBar'
	export default{
		data(){
			return{
				msg:''
			}
		},
		components:{
			tabBar
		},
		methods:{
			toGetPhone(){
				console.log('要去获取用户的手机号');
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
			}
		}
	}
</script>

<style>
	.my-content{
		padding:0 10px;
	}
	.title{
		line-height: 50px;
	}
	.box{
		display: flex;
		line-height: 50px;
	}
	.box .part-name{
		flex: 9;
	}
	.box .part-code{
		flex: 2;
	}
	.box .part-code img{
		padding-top: 10px;
		width: 32px;
		height: 32px;
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
	}
	.flex-item img{
		width:32px;
		height: 32px;
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
</style>
