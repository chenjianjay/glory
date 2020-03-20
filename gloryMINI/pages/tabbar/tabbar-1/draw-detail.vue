<template>
	<view class="global-bg">
		<view class="card card-1">
			<image :src="skim.imgUrl" mode="widthFix"></image>
			<view class="message-box">
				<view class="name">{{skim.name}}</view>
				<view>截止时间：{{skim.closeDate}}</view>
				<view class="tip">抽奖超过1000人，可提前开奖</view>
			</view>
		</view>
		
		<!-- #ifdef MP-QQ -->
		<ad unit-id="5a94defab43fa57b02df40a18f563760"></ad>
		<!-- #endif -->
		
		<view class="card card-2">
			<button class="join-btn" @click="joinBtn(skim.period)">
				抽 奖
			</button>
			<text class="remain">( 50 积分/次，当前剩余 {{remainTimes}} 次 )</text>
			<view class="get-all">
				已有 {{skim.joinCount}} 人参与，<text class="get-btn" @click="getAll(skim.period)">查看全部 ></text>
			</view>
			
			<view class="number-box-list">
				<image :src="item.avatarUrl" mode="scaleToFill" v-for="(item, id) in personlList" :key="id"></image>
			</view>
		</view>
		<button class="go-mask" type="primary" @click="goTabbar">做任务</button>
		<view class="bottom"></view>
		
		<!-- pop -->
		<!-- <uni-popup class="pop" v-show="show">
			<view class="btn-box">
				<button type="primary" size="mini">返回首页</button>
				<button type="primary" size="mini">赚积分</button>
			</view>
			<image class="cancle" src="../../../static/arrow-right.png" mode="scaleToFill"></image>
		</uni-popup> -->
		<view class="draw-bg" v-show="show">
			<view v-show="nocredit" class="btn" @click="goTabbar"></view>
			<image v-show="nocredit" class="noCredit" src="../../../static/no-credit.png" mode="scaleToFill"></image>

			<view v-show="!nocredit" class="again-btn"  @click="cancel"></view>
			<image v-show="!nocredit" class="noCredit" src="../../../static/again.jpg" mode="scaleToFill"></image>
			<image class="cancel" src="../../../static/cancel.png" mode="scaleToFill" @click="cancel"></image>
			<!-- #ifdef MP-QQ -->
			<ad class="ad2" unit-id="5a94defab43fa57b02df40a18f563760"></ad>
			<!-- #endif -->
		</view>
		
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
				skim: {
					period: '',
					imgUrl: '',
					name: '',
					joinCount: '',
					closeDate: '',
				},
				personlList: [
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png',
					// '../../../static/img/release.png'
				],
				show: false,
				credit: 0,
				loading: false,
				nocredit: false
			}
		},
		onLoad(options) {
			this.skim = JSON.parse(options.data)
			this.credit = this.$store.state.task.credit
			this.getMember()
		},
		computed: {
			remainTimes() {
				return Math.floor(this.credit/50)
			}
		},
		methods: {
			cancel() {
				this.show = false
			},
			joinBtn(period) {
				if (this.loading) return
				this.loading = true
				if (this.remainTimes > 0) {
					this.show = true
					this.nocredit = false
					this.updateCredit()
				} else {
					uni.showToast({
						title: '积分不足',
						icon: 'none'
					});
					this.show = true
					this.nocredit = true
					this.loading = false
				}
			},
			getAll(period) {
				uni.navigateTo({
					url: `./draw-partic?period=${this.skim.period}&count=${this.skim.joinCount}`
				})
			},
			goTabbar() {
				uni.switchTab({
				    url: '../tabbar-3/tabbar-3'
				});
			},
			updateCredit() {
				this.doRequest('/order/create', {
					period: this.skim.period,
					name: this.skim.name,
					uuid: this.$store.state.uuid,
					nickName: this.$store.state.userInfo.nickName,
					avatarUrl: this.$store.state.userInfo.avatarUrl
				}).then(res=>{
					uni.showToast({
						title: '参与成功，等待开奖',
						icon: 'none'
					})
					this.credit -= 50
					this.skim.joinCount += 1
					this.$store.commit('updateTask', {
						credit: -50,
						totalDrawTimes: 1
					})
					this.loading = false
				}).catch(_=>{
					this.loading = false
				})
			},
			getMember() {
				this.doRequest('/order/get7', {
					period: this.skim.period
				}).then(res=>{
					this.personlList = res.data
				})
				
			}
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
	.global-bg{
		padding-top: 20upx;
	}
	.card{
		margin-left: 30upx;
		margin-top: 20upx;
		margin-right: 30upx;
		width: 690upx;
		border-radius: 20upx;
		overflow: hidden;
		background-color: #302C83;
		margin-bottom: 20upx;
		position: relative;
	}
	.card-1{
		image{
			width: 690upx;
		}
		.message-box{
			height: 115upx;
			margin-left: 30upx;
			margin-right: 30upx;
			font-size: 31upx;
			line-height: 50upx;
			color: #FFFFFF;
			text-align: right;
			.name{
				position: absolute;
				text-align: left;
				bottom: 120upx;
				left: 0;
				width: 100%;
				color: white;
				background-color: rgba($color: #000000, $alpha: 0.6);
				padding-left: 30upx;
				height: 70upx;
				line-height: 70upx;
			}
			.tip{
				color: red;
			}
		}
	}
	.card-2{
		padding-top: 50upx;
		padding-bottom: 50upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		.join-btn{
			width: 200upx;
			height: 200upx;
			border-radius: 50%;
			background-color: #E25A30;
			color: #FFFFFF;
			text-align: center;
			line-height: 200upx;
			// 动画
			-webkit-animation: free_download 1s linear alternate infinite;
			animation: free_download 1s linear alternate infinite;
		}
		@-webkit-keyframes free_download{
		    0%{-webkit-transform:scale(0.9);}
		    100%{-webkit-transform:scale(1);}
		}
		@keyframes free_download{
		    0%{transform:scale(0.9);}
		    100%{transform:scale(1);}
		}
		.remain{
			font-size: 30upx;
			color:yellow;
			margin-top:20upx;

		}
		.get-all{
			font-size: 31upx;
			text-align: center;
			color: #FFFFFF;
			margin-top: 40upx;
			.get-btn{
				border-bottom: 1px solid red;
				color: red;
			}
		}
		.number-box-list{
			margin-top: 45upx;
			margin-left: 90upx;
			margin-right: 90upx;
			display: flex;
			flex-direction: row;
			justify-content: start;
			flex-wrap: wrap;
			image{
				width: 65upx;
				height: 65upx;
				border-radius: 20upx;
				margin-right: 10upx;
				margin-bottom: 10upx;
			}
		}
	}
	.go-mask{
		width: 690upx;
	}
	.bottom{
		height: 50upx;
	}
	.draw-bg{
		width: 100%;
		height: 700px;
		position: fixed;
		top: 150upx;
		background-color: rgba($color: #000000, $alpha: 0.3);
		z-index: 9;
		.btn{
			position: absolute;
			top: 480upx;
			left: 130upx;
			width: 500upx;
			height: 90upx;
			background-color: transparent;
		}
		.again-btn{
			position: absolute;
			top: 520upx;
			left: 130upx;
			width: 500upx;
			height: 80upx;
			background-color: transparent;
		}
		.noCredit{
			width: 600upx;
			height: 600upx;
			margin-left: 75upx;
		}
		.cancel{
			margin-top: 60upx;
			margin-left: 335upx;
			width: 80upx;
			height: 80upx;
		}
		.ad2{
			width: 100%;
			position: fixed;
			bottom: 0;
		}
	}
	.bottom-adv{
		width: 100%;
	}
</style>
