<view><block wx:if="{{!hasLogin}}"><view><view><view class="header"><image src="{{avatarUrl}}"></image></view><view class="content"><view>申请获取以下权限</view><text>获得你的公开信息(昵称，头像、地区等)</text></view><button class="bottom" type="primary" open-type="getUserInfo" withCredentials="true" lang="zh_CN" data-event-opts="{{[['getuserinfo',[['wxGetUserInfo',['$event']]]]]}}" bindgetuserinfo="__e">授权登录</button></view></view></block><ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad></view>