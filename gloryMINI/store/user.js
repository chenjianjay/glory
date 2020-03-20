import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
		uid: '',
		uuid: '',
		userInfo: {
			avatarUrl: '',
			nickName: '',
			city: '',
			country: '',
			province: ''
		},
		task: {
			credit: 50,
			dailyInviteTimes: 0,
			dailyShare: false,
			dailyWatchVideoTimes: 0,
			dailyCheckIn: false,
			totalCheckInTimes: 0,
			totalDrawTimes: 1,
			totalInviteTimes: 0,
			totalWatchVideoTimes: 0,
			weeklyInviteTimes: 0
		}
    },
    mutations: {
        login(state, data) {
            state.uuid = data.uuid;
            state.userInfo = data.userInfo;
			if (data.hasOwnProperty('task')) {
				state.task = data.task
			}
        },
		updateTask(state, data) {
			try{
				let keys = Object.keys(data)
				let len = keys.length
				let flag = false
				while(len--) {
					console.log(keys[len] +'='+ data[keys[len]]);
					flag = isNaN(parseInt(data[keys[len]]))
					if (flag) {
						state.task[keys[len]] = true
					} else {
						if (data[keys[len]] >0) {
							state.task[keys[len]] += Math.abs(data[keys[len]])
						} else {
							state.task[keys[len]] -= Math.abs(data[keys[len]])
						}
					}
				}
			}catch(e){
				//TODO handle the exception
			}
			
		},
		setTask(state, data) {
			state.task = data
		}
		// addDrawTimes(state, drawTimes) {
		// 	state.drawTimes = drawTimes
		// },
		// addCheckInTimes(state, checkInTimes) {
		// 	state.checkInTimes = checkInTimes
		// },
		// reduceCredit(state) {
		// 	state.credit -= 50
		// },
		// addCredit(state, data) {
		// 	state.credit += data
		// }
    },
	getters: {
		getUserInfo(state) {
			return stete.userInfo
		},
		getCredit(state) {
			return stete.credit
		}
	}
})

export default store