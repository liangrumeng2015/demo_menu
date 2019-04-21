<template>
	<view class="page">
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(value,key) in list" :key="key">
				<view class="uni-list-cell-navigate uni-navigate-right uni-media-list" @click="toPages(key)">
					<view class="uni-media-list-logo">
						<image v-if="showImg" :src="value.img"></image>
					</view>
					<view class="uni-media-list-body">
						<view class="uni-media-list-text-top">{{value.title}}</view>
						<view class="uni-media-list-text-bottom uni-ellipsis">{{value.address}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: 'media-list',
				showImg: false,
				list: [{
						title: "麻辣烫123",
						address: "北京市朝阳区123座",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						title: "火锅",
						address: "北京朝阳456座",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90"
					},
					{
						title: "香锅",
						address: "北京朝阳789座",
						img: "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg?imageView2/3/w/200/h/100/q/90"
					}
				]
			}
		},
		onLoad() {
			setTimeout(() => {
				this.showImg = true;
			}, 400)
		},
		onShow(){
			uni.setNavigationBarTitle({
				title: '门店列表'
			});
		},
		methods:{
			toPages(key){
				uni.switchTab({
					url: './home/home'
				});
				uni.setStorageSync('address',this.list[key].address);
				uni.setStorageSync('title',this.list[key].title);
			}
		}
	}
</script>

<style>
.title {
	padding: 20upx;
}
</style>
