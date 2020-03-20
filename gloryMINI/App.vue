<script>
export default {
	onLaunch: function() {
		console.log('App Launch');

		uni.setStorageSync('lanunchTime', {
			time: new Date().getTime()
		});
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
	.global-bg{
		background-image: linear-gradient(-20deg,  #9709F7, #581AE1); 
	}
</style>
