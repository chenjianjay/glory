import Vue from 'vue'
import App from './App'
import store from './store/user.js'
import doRequest from './common/request.js'

Vue.prototype.doRequest = doRequest
Vue.prototype.$store = store
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
