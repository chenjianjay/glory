<template>
	<view>
		<view class="box">
			<view
				class="btn"
				v-for="(item, id) in LockArr"
				:key="id"
				@click="unLock(id)"
				:style="{backgroundColor: item ? '#AAAAAA' : 'red'}"
				
			>
				<image src="../../../static/lock.png" mode="scaleToFill" v-if="item"></image>
				开黑群{{id+1}}
			</view>
		</view>
		<!-- #ifdef MP-WEIXIN -->
		<h1>	微信端该功能不可用</h1>
		<!-- #endif -->
		<!-- #ifdef MP-QQ -->
		<view class="bottom-adv">
			<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad>
		</view>
		<!-- #endif -->
	</view>
</template> 

<script>
export default {
	data() {
		return {
			LockArr: [true, true, true, true],
			selected: '',
			videoAd: '',
			onLoadErr: false
		};
	},
	onLoad() {
		try {
			// 从后台获取，修改后返回给后台
		    const value = uni.getStorageSync('unLockgroupNumber');
		    if (value) {
				this.LockArr = value
		    }
		} catch (e) {
		    // error
		}
	},
	methods: {
		unLock(id) {
			uni.showModal({
			    title: '提示',
			    content: '为避免恶意加群，加入开黑群需先观看15s完整视频，是否观看解锁？',
				confirmText: '解锁',
			    success: (res) => {
			        if (res.confirm) {
						this.selected = id
						this.video()
			        } else if (res.cancel) {
			        }
			    }
			})
		},
		getNumber() {
			// get correct group number
			this.LockArr[this.selected] = false
			try {
			    uni.setStorageSync('unLockgroupNumber', this.LockArr);
			} catch (e) {
			    // error
			}
			uni.setClipboardData({
				data: '909975386',
				success: function(res) {
					uni.getClipboardData({
						success: function(res) {
							uni.showToast({
								title: '群号 已复制到剪贴板'
							});
						}
					});
				}
			})
		},
		video() {
			let start, end;
			let videoAd = qq.createRewardedVideoAd({
			adUnitId: 'e2ef4a02df6b0d9a8ebd13beb5781199'
			})
			videoAd.onLoad(function(res){
			})
			videoAd.onError((res)=>{
				uni.showToast({
					title: '加载失败，请去个人中心：反馈意见'
				})
			})
			
			videoAd.onClose((res)=>{
				end = new Date().getTime()
				if ((end-start)/1000 > 15) {
					this.getNumber()
				}
			})
			
			videoAd.load()
			.then(() => {
				videoAd.show().then(() => {
					start = new Date().getTime()
					
				})
				.catch(err => {
				})
			})
			.catch(err => {
			})
		  
		},
		onShareAppMessage(res) {
			uni.showToast({
				title: 'share'
			})
		    return {
		      title: '王者荣耀，免费抽皮肤，和好兄弟开黑...',
		      path: '/pages/tabbat/login/login?parentID=' + this.$store.state.uuid
		    }
		}
	}
};
</script>

<style lang="scss">
	page{
		background-image: linear-gradient(-20deg,  #9709F7, #581AE1);
		color: #FFFFFF;
		font-size: 35upx;
	}
	.box{
		display: flex;
		justify-content: space-around;
		flex-wrap: wrap;
		.btn{
			position: relative;
			width: 260upx;
			height: 110upx;
			margin-top: 70upx;
			line-height: 100upx;
			text-align: center;
			border-radius: 20upx;
		}
		image{
			width: 80upx;
			height: 130upx;
			position: absolute;
			top: -40upx;
			left: -5upx;
		}
	}
	.bottom-adv{
		width: 100%;
		position: absolute;
		bottom: 0;
	}
</style>
