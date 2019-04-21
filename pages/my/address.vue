<template>
	<div>
		<view>
			您还没有创建地址
		</view>
		<view class="footer-bar">
			<view>导入微信地址</view>
			<view @click="addAdress()">新增地址</view>
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
	methods:{
		addAdress(){
			uni.redirectTo({
				url:'./add_address'
			})
		}
	}
}
</script>

<style>
	.footer-bar{
		width: 100%;
		height: 60px;
		border-top: 1px solid #ccc;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
	}
	.footer-bar view{
		flex: 6;
		line-height: 60px!important;
		text-align: center;
	}
	.footer-bar view:first-child{
		border-right: 1px solid #ccc;
	}
</style>
