(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabbar/tabbar-4/tabbar-4"],{"0771":function(t,e,n){"use strict";n.r(e);var a=n("b51b"),i=n.n(a);for(var r in a)"default"!==r&&function(t){n.d(e,t,function(){return a[t]})}(r);e["default"]=i.a},"0911":function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},r=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return r}),n.d(e,"a",function(){return a})},2853:function(t,e,n){"use strict";(function(t){n("75e0"),n("921b");a(n("66fd"));var e=a(n("2918"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("a821")["createPage"])},2918:function(t,e,n){"use strict";n.r(e);var a=n("0911"),i=n("0771");for(var r in i)"default"!==r&&function(t){n.d(e,t,function(){return i[t]})}(r);n("f80b");var o,c=n("f0c5"),s=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=s.exports},5163:function(t,e,n){},b51b:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{avatarUrl:"",nickName:"",uid:"",checkInTimes:0,credit:0,featureList:[{icon:"../../../static/record.png",msg:"抽奖记录",nav:"./record"},{icon:"../../../static/mail.png",msg:"意见反馈",nav:"./kefu"},{icon:"../../../static/more.png",msg:"更多好玩",nav:void 0}]}},onShow:function(){this.checkInTimes=this.$store.state.task.totalCheckInTimes,this.credit=this.$store.state.task.credit},onLoad:function(){this.avatarUrl=this.$store.state.userInfo.avatarUrl,this.nickName=this.$store.state.userInfo.nickName;try{var e=t.getStorageSync("uid");this.uid=e}catch(n){}},methods:{goTo:function(e){if(void 0!==e)t.navigateTo({url:e});else{var n=qq.createAppBox({adUnitId:"0eeedcec7664f22f4599ec9823bc18ca"});n.load().then(function(){n.show()})}}},onShareAppMessage:function(e){return t.showToast({title:"share"}),{title:"王者荣耀，免费抽皮肤，和好兄弟开黑...",path:"/pages/tabbar/login/login?parentID="+this.$store.state.uuid}}};e.default=n}).call(this,n("a821")["default"])},f80b:function(t,e,n){"use strict";var a=n("5163"),i=n.n(a);i.a}},[["2853","common/runtime","common/vendor"]]]);