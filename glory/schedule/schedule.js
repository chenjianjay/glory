const schedule = require('node-schedule');
const doRequest = require('./clear')

dailySchedule = function() {
    schedule.scheduleJob('0 41 10 * * 2-7', function () {
        console.log('schedule定时器：每日清空'+new Date());
        doRequest({ type: 'daily'}).then(res=>{
            console.log('daily clear success')
            console.log('the request res is == '+res.msg)
        }).catch(err=>{
            console.log(err)
        })
    });
}
weeklySchedule = function() {
    schedule.scheduleJob('0 0 0 * * 1', function () {
        console.log('schedule定时器：每周清空'+new Date());
        doRequest({ type: 'weekly'}).then(res=>{
            console.log('daily clear success')
            console.log('the request res is == '+res.msg)
        }).catch(err=>{
            console.log(err)
        })
    });
}

module.exports = {
    dailySchedule,
    weeklySchedule
}