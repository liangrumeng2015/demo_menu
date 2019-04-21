<template>
	<div>
		<view class="score-card">
			<view class="card-con">
				<view class="card-left">
					<span>账号余额</span>
					<span class="money">0.00</span>
					<span>充值店铺：<a>麻辣烫</a></span>
				</view>
				<view class="card-right">
					<img src="../../static/images/icon_score.png">
					<span>充值</span>
				</view>
				
			</view>
		</view>
		<view class="con">
			<view class="uni-list">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-body">
							交易记录
						</view>
					</view>
				</view>
			</view>
			<view class="uni-list uni-list-top">
				<view class="uni-list-cell">
					<view class="uni-list-cell-navigate uni-navigate-right uni-media-list">
						<view class="uni-media-list-body" @click="toShare()">
							退卡申请
						</view>
					</view>
				</view>
			</view>
		</view>
	</div>
</template>

<script>
</script>

<style>
.score-card{
	width: 95%;
	height: 120px;
	line-height: 120px;
	background: #60A2FF;
	border-radius: 8px;
	margin:0 auto;
	margin-top: 10px;
	text-align: center;
}
.card-con{
	width: 100%;
	height: 120px;
	line-height: 120px;
}
.card-con .card-left,.card-con .card-right{
	height: auto;
	display: inline-block;
	text-align: left;
}
.card-con .card-left{
	width: 75%;
	padding-left: 20px;
	box-sizing: border-box;
	padding-top: 10px;
	color:#fff;
}
.card-con span{
	display: block;
}
.card-con .card-left span.money{
	font-size: 26px;
	margin: 10px 0;
}
.card-con .card-left span a{
	display: inline-block;
}
.card-con .card-right{
	width: 25%;
}
.card-con .card-right span{
	width: 60px;
	height: 25px;
	display: block;
	border-radius: 8px;
	text-align: center;
	line-height: 25px;
	background: yellow;
	margin-top: 10px;
}
.card-con .card-right img{
	width: 32px;
	height: 32px;
	display: block;
	margin:0 auto;
	margin-right: 20px;
}
.con{
	margin:0 10px;
	margin-top: 20px;
}
ul{
	list-style: none;
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
