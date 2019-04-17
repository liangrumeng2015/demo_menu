<template>
	<div>
		付款页面===={{msg}}
	</div>
</template>

<script>
	export default{
		data(){
			return{
				msg:'在请求数据'
			}
		},
		onLoad(){
			this.getRequest();
		},
		methods:{
			getRequest(){
				uni.requestPayment({
					provider: 'alipay',
					orderInfo: 'orderInfo', //微信、支付宝订单数据
					success: function (res) {
						console.log('success:' + JSON.stringify(res));
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			}
		}
	}
</script>

<style>
</style>
