<template>
	<div>
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
			<view class="flex-item1" @click='toMy()'>
				<img src="../../static/images/icon_my.png">
				<span>我的</span>
			</view>
		</view>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				msg:''
			}
		},
		onLoad:{
			toHome(){
			  this.$emit('toHome',this.toHome);//主要是通过$emit方法来实现传参的方式，第一个参数是自定义事件名称，第二个则是要传的数据
			}
		},
		methods:{
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
