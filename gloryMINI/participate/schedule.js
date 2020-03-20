const schedule = require('node-schedule');

function runSchedule (cb) {
    let rule = new schedule.RecurrenceRule();  
    rule.hou = [8,12,18,23];
    rule.minute = [24]
    schedule.scheduleJob(rule, function () {
        console.log('定时任务执行一次');
        cb && cb();
    });
}

module.exports = runSchedule;
