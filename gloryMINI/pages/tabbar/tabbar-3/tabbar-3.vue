<template>
	<view class="global-bg">
		<!-- #ifdef MP-QQ -->
		<ad unit-id="5a94defab43fa57b02df40a18f563760"></ad>
		<!-- #endif -->
		<view class="header">
			我的积分： {{task.credit}}
		</view>
		<!-- <view class="card">
			<view class="title">签到</view>
		</view>
		 -->
		<view class="card">
			<view class="title">每日任务</view>
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">签到</view>
					<view class="award">+8积分</view>
				</view>
				<button v-show="!task.dailyCheckIn" class="fr-btn" size="mini" @click="checkIn()">去完成</button>
				<view v-show="task.dailyCheckIn">
					<button class="fr-btn2" size="mini">
						<image class="hook" src="../../../static/hook.png" mode="scaleToFill"></image>
					</button>
				</view>
			</view>
			<!-- #ifdef MP-QQ -->
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">观看完整视频（{{task.dailyWatchVideoTimes}}次）</view>
					<view class="award">+15积分/次</view>
				</view>
				<button class="fr-btn" size="mini" @click="video()">去完成</button>
			</view>
			<!-- #endif -->
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">邀请2位新用户（{{task.dailyInviteTimes}}/2）</view>
					<view class="award">+20积分</view>
				</view>
				<button v-show="task.dailyInviteTimes<2" class="fr-btn" size="mini" open-type="share">去完成</button>
				<view v-show="task.dailyInviteTimes>=2">
					<button class="fr-btn2" size="mini">
						<image class="hook" src="../../../static/hook.png" mode="scaleToFill"></image>
					</button>
				</view>
			</view>
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">分享小程序</view>
					<view class="award">+30积分</view>
				</view>
				<button v-show="!task.dailyShare" class="fr-btn" size="mini" open-type="share">去完成</button>
				<view v-show="task.dailyShare">
					<button class="fr-btn2" size="mini">
						<image class="hook" src="../../../static/hook.png" mode="scaleToFill"></image>
					</button>
				</view>
			</view>
		</view>
		<!-- #ifdef MP-QQ -->
		<ad unit-id="5a94defab43fa57b02df40a18f563760"></ad>
		<!-- #endif -->
		<view class="card">
			<view class="title">每周任务</view>
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">累计邀请新用户15位（{{task.weeklyInviteTimes}}/15）</view>
					<view class="award">+50积分</view>
				</view>
				<button v-if="task.weeklyInviteTimes<15" class="fr-btn" size="mini" open-type="share">去完成</button>
				<view v-else>
					<button class="fr-btn2" size="mini">
						<image class="hook" src="../../../static/hook.png" mode="scaleToFill"></image>
					</button>
				</view>
			</view>
		</view>
		
		<view class="card">
			<view class="title">挑战任务</view>
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">参与皮肤抽奖999次（{{task.totalDrawTimes}}/999）</view>
					<view class="award">联系客服领奖励</view>
				</view>
				<button class="fr-btn" size="mini">去完成</button>
			</view>
			<!-- #ifdef MP-QQ -->
			<view class="list">
				<view class="fl-message">
					<view class="sub-title">观看完整视频1999次（{{task.totalWatchVideoTimes}}/1999）</view>
					<view class="award">联系客服领奖励</view>
				</view>
				<button class="fr-btn" size="mini" @click="video()">去完成</button>
			</view>
			<!-- #endif -->
		</view>
		<!-- #ifdef MP-QQ -->
		<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad>
		<!-- #endif -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				avatar: '../../../static/img/release.png',
				nickname: 'jay',
				task: {
					'credit': '',
					'dailyInviteTimes': 0,
					'dailyShare': '',
					'dailyWatchVideoTimes': 0,
					'dailyCheckIn': '',
					'totalCheckInTimes': 0,
					'totalDrawTimes': 1,
					'totalInviteTimes': 0,
					'totalWatchVideoTimes': 0,
					'weeklyInviteTimes': 0
				},
				loading: false
			}
		},
		onShow() {
			this.task = this.$store.state.task
		},
		methods: {
			checkIn() {
				if (this.loading) return
				this.loading = true
				this.doRequest('/task/update', {
					uuid: this.$store.state.uuid,
					type: 'checkIn',
					num: '+8'
				}).then(res=>{
					uni.showToast({
						title: '签到成功，积分 +8'
					})
					this.$store.commit('updateTask', {
						dailyCheckIn: true,
						totalCheckInTimes: 1,
						credit: 8
					})
					this.loading = false
				}).finally(_=>{
					this.loading = false
				})
			},
			watch() {
				this.doRequest('/task/update', {
					uuid: this.$store.state.uuid,
					type: 'watch',
					num: '+15'
				}).then(res=>{
					uni.showToast({
						title: '积分 +15'
					})
					this.$store.commit('updateTask', {
						dailyWatchVideoTimes: 1,
						totalWatchVideoTimes: 1,
						credit: 15
					})
				}).finally(()=>{
					this.loading = false
				})
			},
			share() {
				this.doRequest('/task/update', {
					uuid: this.$store.state.uuid,
					type: 'share',
					num: '+30'
				}).then(res=>{
					uni.showToast({
						title: '积分 +30'
					})
					this.task.dailyShare = true
					this.$store.commit('updateTask', {
						dailyShare: true,
						credit: 30
					})
					this.loading = false
				})
			},
			getUserInfo(){
				this.doRequest('/task/get', { uuid: this.$store.state.uuid })
				.then(res=>{
					this.task = res.data
					this.$store.commit('setTask', res.data)
					let pages = getCurrentPages();
					let page = pages[pages.length - 1];
					page.onLoad()
				}).catch(_=>{
					uni.showToast({
						title: '网络繁忙，请稍后再试',
						icon: 'none'
					})
				})
			},
			video() {
				if (this.loading) return
				this.loading = true
				let start, end;
				let videoAd = qq.createRewardedVideoAd({
				adUnitId: 'e2ef4a02df6b0d9a8ebd13beb5781199'
				})
				videoAd.onLoad(function(res){
				})
				videoAd.onError((res)=>{
					uni.showToast({
						title: '视频加载失败，请去个人中心反馈意见'
					})
				})
				
				videoAd.onClose((res)=>{
					end = new Date().getTime()
					if ((end-start)/1000 > 15) {
						this.watch()
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
			  
			}
		},
		onPullDownRefresh() {
			this.getUserInfo();
		},
		onShareAppMessage(res) {
			if (this.loading) return
			this.loading = true
			let that = this
		    return {
		      title: '王者荣耀，免费抽皮肤，和好兄弟开黑...',
		      path: '/pages/tabbar/login/login?parentID='+ this.$store.state.uuid,
			  success: function(){
				  that.share()
			  }
		    }
		}
	}
</script>

<style lang="scss">
	page{
		color: #FFFFFF;
		font-size: 34upx;
	}
	.global-bg{
		width: 100%;
		height: 100%;
	}
	.header{
		padding-top: 30upx;
		font-size: 40upx;
		margin-left: 30rpx;
	}
	.card{
		margin-left: 30rpx;
		width: 690upx;
		border-radius: 20upx;
		overflow: hidden;
		margin-top: 40upx;
		background-color: #302C83;
		margin-bottom: 50upx;
		position: relative;
		padding: 30upx;
		box-sizing: border-box;
		.title{
			font-size: 38upx;
			line-height: 70upx;
		}
		.list{
			border-top: 1px dashed #F1F1F1;
			height: 140upx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.fl-message{
				.sub-title{
					.gray{
						color: gray;
					}
				}
			}
			.fr-btn{
				width: 178upx;
				height: 78upx;
				background-color: red;
				color: #FFFFFF;
				margin: 0;
				white-space: nowrap;
			}
			.fr-btn2{
				width: 175upx;
				height: 78upx;
				position: relative;
				background-color: #00CD00;
				margin: 0;
				.hook{
					width: 70upx;
					height: 45upx;
					position: absolute;
					top: 20upx;
					left: 56upx;
				}
			}
		}
	}
	.card:last-child{
		margin-bottom: 0;
	}
</style>
