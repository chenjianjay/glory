<template>
	<view>
		<!-- #ifdef MP-QQ -->
		<ad unit-id="5a94defab43fa57b02df40a18f563760"></ad>
		<!-- #endif -->
		<view class="title">
			<text>标题</text>
			<input class="title-input" type="text" value="标题可不写" v-model="title" placeholder="请输入标题" />
		</view>
		
		<view class="content">
			内容：
			<textarea maxlength="200" v-model="content" placeholder="请输入详细内容,以便我们提供更好的帮助" />
			<view class="count">最多可输入200字</view>
		</view>
		
		<view class="contact">
			<text>联系方式</text>
			<input class="contact-input" type="text" v-model="contact" value="" placeholder="邮箱/QQ号" />
		</view>

		<button type="primary" @click="commit">提 交</button>
		
		<view class="pop" v-show="show">
			<view>感谢您的反馈</view>
			<view>即将自动返回</view>
			{{num}}
			
			<!-- #ifdef MP-QQ -->
			<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card" style="position:absolute;bottom:0;"></ad>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			title: '',
			content: '',
			contact: '',
			show: false,
			num: 3
		};
	},
	onLoad() {
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
		commit() {
			if (this.content.length === 0 || this.title.length ===0 ) {
				uni.showToast({
					title: '请输入标题和内容',
					icon: 'none'
				})
				return
			}
			const count = this._getByteLen(this.content)
			const count2 = this._getByteLen(this.title)
			if (count > 100 || count2 > 30) {
				uni.showModal({
				    title: '提示',
				    content: `标题最多30字，内容最多200字\n当前标题${count2}字，内容${count}字`,
					showCancel: false,
				    success: (res) => {
				        if (res.confirm) {
							
				        }
				    }
				})
			} else {
				// commit
				this.doRequest('/feedback', {
					uuid: this.$store.state.uuid,
					title: this.title,					content: this.content,					contact: this.contact
				}).then(res=>{
					this.backAction()
				}).catch(_=>{
					this.backAction()
				})
			}
		},
		_getByteLen(v) {
		    var len = 0;
		    for (var i = 0; i < v.length; i++) {
		        var a = v.charAt(i);
		        if (a.match(/[^\x00-\xff]/ig) != null)
		        {
		            len += 2;
		        }
		        else
		        {
		            len += 1;
		        }
		    }
		    return Math.ceil(len/2);
		},
		backAction() {
			this.show = true
			if(this.num <= 0) {
				uni.switchTab({
				    url: '/pages/tabbar/tabbar-4/tabbar-4'
				});
				return
			}
			this.num--
			setTimeout(()=>{
				this.backAction()
			},1000)
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

<style>
	page{
		box-sizing: border-box;
		padding-left: 30upx;
		padding-right: 30upx;
	}
	.content{
		position: relative;
	}
	.count{
		position: absolute;
		right: 15upx;
		bottom: 5upx;
		color: #C0C0C0;
	}
	.title, .contact{
		padding-left: 20upx;
		width: 690upx;
		display: flex;
		justify-content: start;
		align-items: center;
		border-top: 1px solid #808080;
		border-bottom: 1px solid #808080;
		margin-top: 50upx;
		margin-bottom: 70upx;
	}
	textarea{
		width: 690upx;
		border-radius: 20upx;
		margin-top: 20upx;
		border: 1px solid #000;
		padding: 10upx;
		box-sizing:border-box;

	}
	input{
		display: inline-block;
		width: 490upx;
		height: 80upx;
		margin-left: 30upx;
	}
	button{
		width: 400upx;
  		margin-top: 60upx;
	}
	.pop{
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background-color: rgba(46, 18, 163, 0.3);
		color: #FFFFFF;
		font-size: 50upx;
		text-align: center;
		padding-top: 30%;
	}
</style>
