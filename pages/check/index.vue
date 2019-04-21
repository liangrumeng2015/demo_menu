<template>
	<div>
		<view class="content">
			<view class="top-box">
				<view>
					<span>付款给商家</span>
				</view>
				<view class="shop-name">
					<span>名称：</span>
					<span>麻辣烫</span>
				</view>
			</view>
			<view class="shop-icon">
				<img src="../../static/images/icon.jpg">
			</view>
		</view>
		<requestPayment></requestPayment>
	</div>
</template>

<script>
	import requestPayment from '../API/request-payment/request-payment'
	export default{
		data(){
			return{
				msg:'在请求数据'
			}
		},
		components:{
			'requestPayment': requestPayment
		},
		onLoad(){
			
		},
		methods:{
			
		}
	}
</script>

<style>
	.content{
		padding:0 15px;
		position: relative;
	}
	.top-box{
		width: 100%;
		height: 80px;
		background: #FBFBFB;
		border-radius: 5px;
		padding-left: 25px;
		box-sizing: border-box;
	}
	.top-box view:first-child{
		padding-top: 15px;
		font-size: 18px;
	}
	.top-box .shop-name{
		color:#828282;
		line-height: 30px!important;
	}
	.shop-icon{
		position: absolute;
		right: 35px;
		top:15px;
	}
	.shop-icon img{
		width:50px;
		height: 50px;
		border-radius: 5px;
	}
</style>
