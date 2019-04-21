<template>
	<div>
		<view class="listBar">
			<view class="nav" v-for="(item,key) in list" :key="key" @click="changeBar(key)" :class="{'active':item.isActive}">
				{{item.title}}
			</view>
		</view>
		<view class="allPages">
			<view class="pageBar" v-for="(item,key) in detailList" :key="key" v-if="item.isShow">
				<div>{{item.title}}</div>
			</view>
		</view>
	</div>
</template>

<script>
export default{
	data(){
		return{
			msg:'',
			list:[
				{'title':'全部订单','isActive': true},
				{'title':'待支付','isActive': false},
				{'title':'待配送','isActive': false},
				{'title':'待收货','isActive': false}
			],
			detailList:[
				{'title':'全部订单页面','isShow': true},
				{'title':'待支付页面','isShow': false},
				{'title':'代配送页面','isShow': false},
				{'title':'待收货页面','isShow': false}
			]
		}
	},
	onLoad(option){
		console.log(option.id);
		this.changeBar(option.id);
	},
	methods:{
		changeBar(key){
			for(var i = 0; i < this.list.length;i++){
				this.list[i].isActive = false;
				this.list[key].isActive = true;
				this.detailList[i].isShow = false;
				this.detailList[key].isShow = true;
			}
			
			
		}
	}
}
</script>

<style>
.listBar{
	width: 100%;
	display: flex;
}
.listBar .nav{
	line-height: 30px;
	margin:0 10px;
	text-align: center;
	flex: 4;
}
.active{
	border-bottom: 1px solid #09BB07;
}
.pageBar{
	width: 100%;
	height: 100%;
	text-align: center;
	transform: translateY(50%);
}
</style>
