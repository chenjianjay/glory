<template>
	<view class="global-bg">
		<view class="fixed_head">
			<view class="header-title">
				<view class="header-icon">
					<image src="../../../static/broadcast.png" mode="scaleToFill"></image>
				</view>
				<view class="notice">
					<view v-show="!noWinner" class="notice-msg" v-for="(item, id) in notice" :key="id">恭喜{{item.nickName}}在第{{item.period}}期中奖</view>
					<view v-show="noWinner" class="notice-msg" :style="{transform: 'translateX('+ distance +'rpx)'}">中奖后，请24h内联系客服</view>
				</view>
			</view>
		</view>
		<view class="li-line"></view>
		<view class="li" v-for="(item, id) in skimList" :key="id">
			<view class="item">
				<image class="hot-icon" src="../../../static/hot.png" mode="scaleToFill"></image>
				<image class="skim-pic" :src="item.imgUrl" mode="widthFix">
				</image>
				<view class="message-box">
					<view class="name">{{item.name}}</view>
					<view>当前参与人数：{{item.joinCount}}</view>
					<view>截止时间：{{item.closeDate}}</view>
				</view>
				<button class="goPage-btn" size="mini" @click="goPage(id)">参与抽奖</button>
			</view>
			<!-- #ifdef MP-QQ -->
			<view class="item" v-if="id%2 === 0">
				<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>

export default {
	data() {
		return {
			distance: -740,
			skimList: [
			],
			notice: [
			],
			noWinner: true
		};
	},
	onLoad() {
		let uuid = ''
		try{
			uuid = uni.getStorageSync('uuid')
		}catch(e){
			//TODO handle the exception
		}
		if (!uuid) {
			uni.navigateTo({
				url: '../login/login'
			})
		} else {
			this.getSkims()
			this.getNotice()
		}
	},
	onPullDownRefresh() {
		this.getSkims();
	},
	methods: {
		goPage(id) {
			uni.navigateTo({
				url: './draw-detail?data=' + JSON.stringify(this.skimList[id])
			})
		},
		headerRoll() {
			if (this.distance< -400) {
				this.distance = 710
			}
			this.distance = this.distance - 3
			setTimeout(()=>{
				this.headerRoll()
			},40)
		},
		getNotice() {
			this.doRequest('/winner/get').then(res=>{
				if (res.data.length >1) {
					this.notice = res.data
					this.noWinner = false
					this.scroll()
				} else if (res.data.length == 0) {
					this.noWinner = true
					this.headerRoll()
				}
			})
		},
 		scroll(){
		    setTimeout(()=>{
			    this.notice.push(this.notice[0]);
			    this.notice.shift();
				this.scroll()
		    },2000)
		},
		getSkims() {
			this.doRequest('/skim/getSkims').then(res=>{
				console.log(res);
				let data = res.data.map(i=>{
					i.closeDate = this.formatdate(i.closeDate)
					return i
				})
				this.skimList = data
			})
		},
		formatdate(a) {
			let date = new Date(a);
			let year = date.getFullYear();
			let month = date.getMonth() + 1;
			let day = date.getDate();
			let h = date.getHours();
			let m = date.getMinutes()
			let s = date.getSeconds()
			month = month > 9 ? month : '0' + month;;
			day = day > 9 ? day : '0' + day;
			h = h > 9 ? h : '0' + h;
			m = m > 9 ? m : '0' + m;
			s = s > 9 ? s : '0' + s;
			return `${year}-${month}-${day} ${h}:${m}:${s}`;
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
};
</script>

<style lang="scss">
	page{
		background-color: #581AE1;
	}
	.fixed_head{
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 5;
		background-color: rgba($color: red, $alpha: 0.7);
		font-size: 35upx;
		color: white;
		height: 70upx;
		overflow: hidden;
		.header-title{
			.header-icon{
				width:70rpx;
				background:rgb(206, 8, 67);
				position:relative;
				z-index:9;
				image{
					width: 60upx;
					height: 60upx;
				}
			}
			.notice{
				margin-top: -60upx;
				margin-left: 70upx;
				.notice-msg{
					height: 90upx;
				}
			}
		}
	}
	.li-line{
		height: 70upx;
	}
	.item{
		width: 690upx;
		margin-left: 30upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
		border-radius: 20upx;
		background-color: #302C83;
		color: white;
		overflow: hidden;
		position: relative;
		.hot-icon{
			width: 100upx;
			height: 100upx;
			position: absolute;
			right:-5upx;
			top:-10upx;

		}
		.skim-pic{
			width: 100%;
		}
		.message-box{
			height: 120upx;
			margin-left: 30upx;
			margin-right: 30upx;
			font-size: 30upx;
			line-height: 54upx;
			.name{
				position: absolute;
				bottom: 129upx;
				left: 0;
				width: 100%;
				color: white;
				background-color: rgba($color: #000000, $alpha: 0.6);
				padding-left: 30upx;
				height: 80upx;
				line-height: 80upx;
				font-size: 38upx;
			}
		}
		.goPage-btn{
			background-color: red;
			color: white;
			height: 70upx;
			position: absolute;
			right: 10upx;
			bottom: 20upx;
		}
	}
	.li:last-child{
		margin-bottom: 0;
		padding-bottom: 50upx;
	}
</style>
