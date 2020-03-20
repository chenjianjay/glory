<template>
	<view class="global-bg">
		<view class="title">
			第 {{period}} 期
		</view>
		<view class="title">
			累计 {{totalCount}} 位参与者
		</view>
		<view class="desc">
			注：每位用户可参与多次，提高中奖率，快去做任务赚取积分吧！
		</view>
		<view class="list" v-for="(item, id) in personlList" :key="id">
			<view class="item">
				<view class="userinfo">
					<image :src="item.avatarUrl" mode="scaleToFill"></image>
					<view class="nickname">{{item.nickName}}</view>
				</view>
				<view class="join-date">{{item.createdAt}}</view>
			</view>
			
			<!-- #ifdef MP-QQ -->
			<view class="adver" v-if="id%4 === 0">
				<ad unit-id="5a94defab43fa57b02df40a18f563760"></ad>
			</view>
			<!-- #endif -->
		</view>
		
		<view class="load-more">
			  {{loadingType === 0 ? contentText.contentdown : (loadingType === 1 ? contentText.contentrefresh : contentText.contentnomore)}}
		</view>
		<!-- #ifdef MP-QQ -->
		<view class="bottom-adv" v-if="page=='1' && personlList.length=='0'">
			<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				totalCount: '',
				page: 1,
				loadingType: 0,
				contentText: {
					contentdown: "上拉显示更多",
					contentrefresh: "正在加载...",
					contentnomore: "没有更多数据了"
				},
				period: '',
				personlList: [
					
				]
			}
		},
		onLoad(options) {
			this.period = options.period
			this.totalCount = options.count
			this.getList(1)
			// #ifdef MP-QQ
				let InterstitialAd = qq.createInterstitialAd({
					adUnitId: '8e2c1b770d14d96cb678504d7397227a'
				});
				InterstitialAd.load().catch((err) => {
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
			getList(page) {//第一次回去数据
			    this.loadingType = 0;
			    uni.showNavigationBarLoading();
				this.doRequest('/order/getOrderByPeriod', {
						period: this.period,
						page: {
							pageBegin: this.page,
							pageNum: 8
						}
				}).then(res=>{
					console.log(res);
					this.count = res.data.count
					if (page == 1 && res.data.rows.length == 0) {
						this.personlList = []
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
						this.personlList = data
					} else {
						this.personlList = this.personlList.concat(data)
					}
					if(page ==1 && res.data.rows.length <8) {
						this.loadingType = 2
					}
					uni.hideNavigationBarLoading();
					uni.stopPullDownRefresh();
				})
			}
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
		height: 100%;
		background-image: linear-gradient(-20deg,  #9709F7, #581AE1);
		
	}
	.title{
		padding-top: 20upx;
		padding-left: 30upx;
		color: #FFFFFF;
		font-size: 36upx;
	}
	.desc{
		margin-top: 20upx;
		padding-left: 30upx;
		padding-right: 30upx;
		color: red;
		font-size: 35upx;
	}
	.list{
		margin-top: 10upx;
		.item{
			border: 1px solid #C0C0C0;
			background-color: #FFFFFF;
			height: 110upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-left: 20upx;
			padding-right: 20upx;
			.userinfo{
				display: flex;
				justify-content: center;
				align-items: center;
				image{
					width: 60upx;
					height: 60upx;
					border-radius: 20upx;
					margin-right: 20upx;
				}
				.nickname{
					// display: inline-block;
					width: 200upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.adver{
			background: #FFFFFF;
			margin-top: 10upx;
			padding-top: 15upx;
			padding-bottom: 15upx;
		}
	}
	.load-more{
		height: 80upx;
		line-height: 80upx;
		text-align: center;
		color: #FFFFFF;
		padding-bottom: 50upx;
	}
	.bottom-adv{
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>
