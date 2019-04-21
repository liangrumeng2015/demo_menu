<template>
	<view>
		<view class="content">
			<view class="item-box">
				<span class="title">收货人</span>
				<input class="title-input" type="text" placeholder="请输入收货人姓名" />
			</view>
			<view class="item-box">
				<span class="title">手机号码</span>
				<input class="title-input" type="number" placeholder="请输入收货人电话" />
			</view>
			<view class="item-box">
				<span class="title">所在地区</span>
				<view class="title-input select-part">
					<input class="" type="text" disabled="disabled" placeholder="请选择" />
					<label class="icon-next"><img src="../../static/images/icon_next.png"></label>
				</view>
			</view>
			<view class="item-box">
				<span class="title">详细地址</span>
				<input class="title-input" type="text" placeholder="街道/门牌号等" />
			</view>
			<view class="item-box address-box">
				<span class="title">设为默认地址</span>
				<view class="title-input select-part">
					<input class="" type="text" disabled="disabled" />
					<label class="icon-box"><checkbox value="" /></label>
				</view>
			</view>
			<view class="btn btn-save">保存</view>
			<view class="btn wx-address">导入微信地址</view>
		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				msg:''
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.content{
	margin:0 10px;
	margin-top:10px;
}
.item-box{
	width: 100%;
	display: flex;
	margin-bottom: 1px;
}
.address-box{
	margin-top:20px;
}
.item-box .title{
	width: 100%;
	display: block;
	background: #fff;
	padding-left: 10px;
	line-height: 40px;
	flex: 3;
}
.item-box .title-input{
	flex: 9;
	height: 40px;
	line-height: 40px;
	background: #fff;
	text-indent: 4px;
}
.item-box .title-input input{
	height: 40px;
}
.item-box .select-part{
	position: relative;
}
.select-part .icon-next{
	position: absolute;
	right: 10px;
	top:12px;
	z-index: 5;
}
.select-part .icon-next img{
	width: 16px;
	height: 16px;
}
.select-part .icon-box{
	position: absolute;
	right: 0;
	top:8px;
	right: 10px;
	z-index: 20;
	text-indent: 0;
}
.btn{
	width: 100%;
	height: 45px;
	
	border-radius: 8px;
	text-align: center;
	line-height: 45px!important;
	color:#fff;
	margin-top: 20px;
}
.btn-save{
	background: #33AAFF;
	margin-top: 50px;
}
.wx-address{
	border:1px solid #33AAFF;
	color: #33AAFF;
}
</style>
