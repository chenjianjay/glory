<view><picker class="pick-box" value="{{month}}" range="{{monthArr}}" data-event-opts="{{[['change',[['bindNumChange',['$event']]]]]}}" bindchange="__e"><image src="../../../static/calender.png" mode="scaleToFill"></image><text>{{month+" 月"}}</text><text class="fr">{{"共 "+count+" 条记录"}}</text></picker><block wx:for="{{list}}" wx:for-item="item" wx:for-index="id" wx:key="id"><view><view class="item"><view class="fr"><view class="period">{{"第 "+item.period+" 期"}}</view><view class="name">{{item.name}}</view><view class="date">{{"抽奖时间："+item.createdAt}}</view></view><block wx:if="{{item.status==0}}"><image class="type" src="../../../static/play_dkj.png" mode="scaleToFill"></image></block><block wx:if="{{item.status==1}}"><image class="type" src="../../../static/play_wzj.png" mode="scaleToFill"></image></block><block wx:if="{{item.status==2}}"><image class="type" src="../../../static/play_yzj.png" mode="scaleToFill"></image></block></view><block wx:if="{{id%4===0}}"><view class="adv"><ad unit-id="5a94defab43fa57b02df40a18f563760"></ad></view></block></view></block><view class="load-more">{{''+(loadingType===0?contentText.contentdown:loadingType===1?contentText.contentrefresh:contentText.contentnomore)+''}}</view><block wx:if="{{page=='1'&&list.length=='0'}}"><view class="bottom-adv"><ad unit-id="39c018b107250732f35e730e4f104b6a" type="card"></ad></view></block></view>