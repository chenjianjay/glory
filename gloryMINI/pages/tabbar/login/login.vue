<template>
	<view>
		<view v-if="!hasLogin">
			<view>
				<view class='header'>
					<image :src='avatarUrl'></image>
				</view>
				<view class='content'>
					<view>申请获取以下权限</view>
					<text>获得你的公开信息(昵称，头像、地区等)</text>
				</view>

                <button class='bottom' type='primary' open-type="getUserInfo" withCredentials="true" lang="zh_CN" @getuserinfo="wxGetUserInfo">
					授权登录
				</button>
			</view>
		</view>
		<!-- #ifdef MP-QQ -->
		<ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad>
		<!-- #endif -->
	</view>
</template>

<script>
	import doRequest from '@/common/request.js'
	 export default {
	        data() {
	            return {
	                avatarUrl: null,
	                hasLogin: uni.getStorageSync('hasLogin'),
					parentUUID: ''
	            };
	        },
	        methods: {
	            //第一授权获取用户信息===》按钮触发
	            wxGetUserInfo() {
					uni.showLoading({
						title: '登录中...'
					});
	                uni.getUserInfo({
	                    provider: 'qq',
	                    success: (infoRes) => {
							this.avatarUrl = infoRes.userInfo.avatarUrl
	                      const data = {
　　　　　　　　　　　　　　　		nickName: infoRes.userInfo.nickName,
								avatarUrl: infoRes.userInfo.avatarUrl,
								city: infoRes.userInfo.city,
								country: infoRes.userInfo.country,
								province: infoRes.userInfo.province,
								parentUUID: this.parentUUID
							}
	                        try {
	                            doRequest('/user/register',data).then(res=>{
									console.log(res);
									uni.setStorageSync('uuid', res.data.uuid)
									uni.setStorageSync('uid', res.data.uid)
									uni.setStorageSync('hasLogin', true);
									this.$store.commit('login', {
										uuid: res.data.uuid,
										uid: res.data.uid,
										userInfo: data,
										task: res.data.task
									})
	                            	uni.reLaunch({
	                            		url: '../tabbar-1/tabbar-1'
	                            	})
	                            })
	                        } catch (e) {}
	                    }
	                });
					uni.hideLoading();
	            },
	            login() {
					if (this.hasLogin) {
						uni.showLoading({
							title: '登录中...'
						});
						uni.getUserInfo({
							provider: 'qq',	
							success: (infoRes)=>{
								this.avatarUrl = infoRes.userInfo.avatarUrl
								let uuid = ''
								try{
									uuid = uni.getStorageSync('uuid')
								}catch(e){
									//TODO handle the exception
								}
								const data = {
									uuid,
									data: {
	 　　　　　　　　　　　　　　　　		nickName: infoRes.userInfo.nickName,
										avatarUrl: infoRes.userInfo.avatarUrl,
										city: infoRes.userInfo.city,
										country: infoRes.userInfo.country,
										province: infoRes.userInfo.province
									}
								}
								doRequest('/user/update', data).then(res=>{
									console.log(res);
									// console.log(JSON.stringify(res.mask));
									this.$store.commit('login', {
										uuid: data.uuid,
										userInfo: data.data,
										task: res.task
									})
									uni.reLaunch({
										url: '../tabbar-1/tabbar-1'
									})
								}).catch(_=>{
									this.$store.commit('login', {
										uuid: data.uuid,
										userInfo: data.data
									})
									uni.reLaunch({
										url: '../tabbar-3/tabbar-3'
									})
								})
							}
						})
						uni.hideLoading();
					}
	            }
	        },
	        onLoad(options) {//默认加载
			console.log('login');
				this.avatarUrl = '../../../static/qq.png'
	            this.login();
				if (options.parentID) {
					this.parentUUID = options.parentID
				}
	        }
	    }
</script>

<style>
	.header {
	        margin: 60upx 0 60upx 50upx;
	        border-bottom: 1px solid #ccc;
	        text-align: center;
	        width: 650upx;
	        height: 300upx;
	        line-height: 450upx;
	    }
	
	    .header image {
	        width: 200upx;
	        height: 200upx;
			border-radius: 50%;
	    }
	
	    .content {
	        margin-left: 50upx;
	        margin-bottom: 60upx;
	    }
	
	    .content text {
	        display: block;
	        color: #9d9d9d;
	        margin-top: 30upx;
	    }
	
	    .bottom {
	        border-radius: 80upx;
	        margin: 50upx 50upx;
	        font-size: 35upx;
	    }
</style>
