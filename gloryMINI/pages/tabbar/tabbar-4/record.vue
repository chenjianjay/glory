<template>
	<view>
		<picker class="pick-box" :value="month" :range="monthArr" @change="bindNumChange">
			<image src="../../../static/calender.png" mode="scaleToFill"></image>
			<text>{{month}} 月</text>
			<text class="fr">共 {{count}} 条记录</text>
		</picker>
		
		<view v-for="(item, id) in list" :key="id">
			<view class="item">
				<view class="fr">
					<view class="period">第 {{item.period}} 期</view>
					<view class="name">{{item.name}}</view>
					<view class="date">参与时间：{{item.createdAt}}</view>
				</view>
				<image v-if="item.status==0" class="type" src="../../../static/play_dkj.png" mode="scaleToFill"></image>
				<image v-if="item.status==1" class="type" src="../../../static/play_wzj.png" mode="scaleToFill"></image>
				<image v-if="item.status==2" class="type" src="../../../static/play_yzj.png" mode="scaleToFill"></image>
			</view>
			
			<!-- #ifdef MP-QQ -->
			<view class="adv" v-if="(id%4===0)">
				<ad unit-id="5a94defab43fa57b02df40a18f563760"></ad>
			</view>
			<!-- #endif -->
		</view>
		
		<view class="load-more">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
		</view>
		
		<view class="bottom-adv" v-if="page=='1' && list.length=='0'">
			<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getMonth()
			return {
				month: currentDate,
				monthArr: ['',1,2,3,4,5,6,7,8,9,10,11,12],
				list: [
					// {
					// 	name: '但是风格豆腐 是',
					// 	period: '123',
					// 	imgUrl: '../../../static/mail.png',
					// 	joinDate: '2020-03-03 06:22',
					// 	status: 0
					// }
				],
				totalCount: '',
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				count: ''
			}
		},
		onLoad() {
			this.getList(1)
			// #ifdef MP-QQ
				let InterstitialAd = qq.createInterstitialAd({
					adUnitId: '8e2c1b770d14d96cb678504d7397227a'
				});
				InterstitialAd.load().catch((err) => {
					console.error('load',err)
				})        
				InterstitialAd.onLoad(() => {
				})
				InterstitialAd.onClose(() => {
				})       
				InterstitialAd.onError((e) => {
				})    
				
				try {
				    const value = uni.getStorageSync('lanunchTime');
				    if (value) {
						const newTime = new Date().getTime()
				        const oldTime = value.time
						if ((newTime - value.time)/1000 > 30) { //进入app已过 30s
							const showTime = uni.getStorageSync('showInsertTime').time
							if (showTime) {
								if ((newTime - showTime)/1000 > 60) {
									setTimeout(()=>{
										this.adShow(InterstitialAd)
									},2000)
								}
								
							} else {
								setTimeout(()=>{
									this.adShow(InterstitialAd)
								},2000)
							}
						}
				    }
				} catch (e) {
				    // error
				}
				// #endif
		},
		methods: {
			adShow(InterstitialAd) {
				// #ifdef MP-QQ
				InterstitialAd.show()
				.then(() => {
					try {
					    uni.setStorageSync('showInsertTime', {
							time: new Date().getTime()
						});
					} catch (e) {
					    // error
					}
				})
				.catch((err) => {
					console.error('show',err)
				})
				// #endif
			},
			bindNumChange(e) {
				this.month = parseInt(e.target.value)
				this.page = 1
				this.getList(1)
			},
			getMonth() {
				const date = new Date();
				let month = date.getMonth() + 1;
				return month
			},
			getList(page) {//第一次回去数据
				this.loadingType = 0;
				uni.showNavigationBarLoading();
				this.doRequest('/order/getRecordList', {
					uuid: this.$store.state.uuid,
					page: {
						pageBegin: this.page,
						pageNum: 8
					},
					date: this.month > 9 ? this.month : '0' + this.month
				}).then(res=>{
					this.count = res.data.count
					if (page == 1 && res.data.rows.length == 0) {
						this.list = []
						this.loadingType = 2
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						return
					}
					this.page++
					if(res.data.rows.length == 0) {
						this.loadingType = 2
						uni.hideNavigationBarLoading();
						uni.stopPullDownRefresh();
						return
					}
					let data = res.data.rows
					if (page === 1) {
						this.list = data
					} else {
						this.list = this.list.concat(data)
					}
					
					if(page ==1 && res.data.rows.length <8) {
						this.loadingType = 2
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
				})
			},
		},
		onPullDownRefresh() {
			this.page = 1
			this.getList(1);
		},
		// 上拉加载
		onReachBottom() {
			if (this.loadingType != 0) {//loadingType!=0;直接返回
				return false;
			}
			this.loadingType = 1;
			uni.showNavigationBarLoading();//显示加载动画
			setTimeout(()=>{
				this.getList()	
			},500)
		},
		onShareAppMessage(res) {
			uni.showToast({
				title: 'share'
			})
		    return {
		      title: '王者荣耀，免费抽皮肤，和好兄弟开黑...',
		      path: '/pages/tabbar/login/login?parentID='+ this.$store.state.uuid
		    }
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f4f4f4;
	}
	.pick-box{
		margin-top: 30upx;
		margin-left: 30upx;
		box-sizing: border-box;
		border-bottom: 20upx;
		margin-bottom: 50upx;
		border-bottom: 1px solid #000;
		image{
			display: inline-block;
			margin-right: 20upx;
			width: 50upx;
			height: 50upx;
		}
		.fr{
			
		}
	}
	.item{
		margin-top: 30upx;
		margin-left: 28upx;
		margin-right: 28upx;
		background-color: #FFFFFF;
		box-shadow: 0upx 0upx 5upx #888888;
		border-radius: 15upx;
		height:210upx;
		padding:30upx;
		box-sizing: border-box;
		overflow: hidden;
		position: relative;
		.fr{
			font-size: 35upx;
			line-height: 56upx;
		}
		.type{
			width: 170upx;
			height: 170upx;
			position: absolute;
			right: -20upx;
			top: -20upx;
		}
	}
	.load-more{
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		color: #000;
		margin-bottom: 50upx;
	}
	.bottom-adv{
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>
