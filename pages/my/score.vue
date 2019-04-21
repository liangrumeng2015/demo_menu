<template>
	<div>
		<view class="score-card">
			<view class="card-con">
				<img src="../../static/images/icon_score.png">
				<span>0</span>
			</view>
		</view>
		<view class="con">
			<span>积分明细</span>
			<ul>
				<li></li>
			</ul>
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
	background: #EDC979;
	border-radius: 8px;
	margin:0 auto;
	margin-top: 10px;
	text-align: center;
}
.card-con{
	width: 100%;
	line-height: 120px!important;
}
.card-con span{
	font-size: 34px;
	font-weight: bold;
	color:#775429;
	padding-left: 10px;
}
.card-con img{
	width: 32px;
	height: 32px;
	vertical-align:text-bottom
}
.con{
	margin:0 10px;
	margin-top: 20px;
}
ul{
	list-style: none;
}
</style>
