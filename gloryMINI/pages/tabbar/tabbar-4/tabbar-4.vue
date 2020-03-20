<template>
	<view>
		<view class="header-bg"></view>
		<view class="userinfo">
			<image :src="avatarUrl" mode="scaleToFill"></image>
			<view class="nickname">{{nickName}}</view>
			<view class="nickname">ID: {{uid}}</view>
		</view>
		
		<view class="sign-in">
			<view class="wrap">
				<view class="title">累计签到 <text> {{checkInTimes}}</text> 天</view>
				<view class="title">积分：<text> {{credit}} </text> </view>
			</view>
			<!-- <button class="sign-in-btn" type="primary" size="mini">签到</button> -->
		</view>
		
		<view class="feature-list">
			<!-- 以后有签到排行榜 -->
			<view class="feature-list-item" v-for="(item, id) in featureList" :key="id" @click="goTo(item.nav)">
				<image class="icon" :src="item.icon" mode="scaleToFill"></image>
				<text class="msg">{{item.msg}}</text>
				<image class="arrow" src="../../../static/arrow-right.png" mode="scaleToFill"></image>
			</view>
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
				avatarUrl: '',
				nickName: '',
				uid: '',
				checkInTimes: 0,
				credit: 0,
				featureList: [
					{
						icon: '../../../static/record.png',
						msg: '抽奖记录',
						nav: './record'
						
					},
					{
						icon: '../../../static/mail.png',
						msg: '意见反馈',
						nav: './kefu'
					},
					// #ifdef MP-QQ
					{
						icon: '../../../static/more.png',
						msg: '更多好玩',
						nav: undefined
					},
					// #endif
				]
			}
		},
		onShow() {
			this.checkInTimes = this.$store.state.task.totalCheckInTimes
			this.credit = this.$store.state.task.credit
		},
		onLoad() {
			this.avatarUrl = this.$store.state.userInfo.avatarUrl
			this.nickName = this.$store.state.userInfo.nickName
			try{
				const v = uni.getStorageSync('uid')
				this.uid = v
			}catch(e){
				//TODO handle the exception
			}
		},
		methods: {
			goTo(nav) {
				if (nav === undefined) {
					// #ifdef MP-QQ
					let appbox = qq.createAppBox({
					  adUnitId: '0eeedcec7664f22f4599ec9823bc18ca'
					})
					appbox.load().then(()=>{
					  appbox.show()
					})
					// #endif
					return
				}
				uni.navigateTo({
					url: nav
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
	page{
		background-color: #f4f4f4;
	}
	.header-bg {
		width: 100%;
		height: 300upx;
		background-image: linear-gradient(-5deg,  #9709F7, #581AE1);
		position: fixed;
		top: 0;
	}
	.userinfo {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 150upx;
			height: 150upx;
			border-radius: 50%;
		}
		.nickname{
			color: #FFFFFF;
			font-size: 35upx;
		}
	}
	.sign-in{
		position: relative;
		margin-top: 20upx;
		margin-left: 40upx;
		margin-right: 40upx;
		background-color: #FFFFFF;
		border-radius: 10upx;
		padding: 30upx;
		.wrap{
			display:flex;
			justify-content:space-around;
			text{
				color: #FF9138;
			}
		}
		&-btn{
			width: 200upx;
			margin-left:226upx;
			margin-top:30upx;
		}
	}
	.feature-list{
		margin-top: 30upx;
		margin-left: 40upx;
		margin-right: 40upx;
		margin-bottom: 50upx;
		border-radius: 10upx;
		background-color: #FFFFFF;
		position: relative;
		.feature-list-item{
			height: 90upx;
			position: relative;
			border-bottom: 1px dashed #808080;
			.icon{
				width: 60upx;
				height: 60upx;
				position: absolute;
				left: 15upx;
				top: 15upx;
			}
			.msg{
				line-height:90upx;
				padding-left:90upx;

			}
			.arrow{
				width: 30upx;
				height: 50upx;				
				position: absolute;
				top: 20upx;
				right: 30upx;
			}
		}
		.feature-list-item:last-child{
			border-bottom: none;
		}
	}
</style>
