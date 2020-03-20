const TaskModel = require("../modules/task");
const Sequelize = require("sequelize")

class TaskController {
    /**
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async get(ctx){
        let body = ctx.request.body
        console.log(body)
        if(body.uuid){
            try{
                let data = await TaskModel.getTask(body.uuid);
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'get success',
                    data
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'get fail',
                    data:err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }

    static async update(ctx){
        let body = ctx.request.body
        console.log(body)
        if(body.num && body.type && body.uuid){
            let data = {}
            let has;
            try{
                switch (body.type) {
                    case 'checkIn':
                        has = await TaskModel.getOne(['dailyCheckIn'], body.uuid)
                        console.log('今天签到了嘛'+ has)
                        if (has.dailyCheckIn) {
                            ctx.response.status = 412;
                            ctx.body = {
                                msg: '该任务已完成'
                            }
                            return
                        }
                        data = {
                            dailyCheckIn: true,
                            totalCheckInTimes: Sequelize.literal(`totalCheckInTimes+1`),
                            credit: Sequelize.literal(`credit${body.num}`)
                        }
                        break;
                    case 'watch':
                        data = {
                            dailyWatchVideoTimes: Sequelize.literal(`dailyWatchVideoTimes+1`),
                            totalWatchVideoTimes: Sequelize.literal(`totalWatchVideoTimes+1`),
                            credit: Sequelize.literal(`credit${body.num}`)
                        }
                        break;
                    case 'share':
                        has = await TaskModel.getOne(['dailyShare'], body.uuid)
                        if(has.dailyShare) {
                            ctx.response.status = 412;
                            ctx.body = {
                                msg: 'has ok success'
                            }
                            return;
                        }
                        data = {
                            dailyShare: true,
                            credit: Sequelize.literal(`credit${body.num}`)
                        }
                        break;
                }
                await TaskModel.update(data, body.uuid);
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'update success'
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'update fail',
                    data:err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }

    static async clear(ctx){
        let body = ctx.request.body
        console.log(body)
        if (body.type) {
            try{
                switch (body.type) {
                    case 'daily':
                        await TaskModel.clearDaily()
                        break;
                    case 'weekly':
                        await TaskModel.clearWeekly()
                        break;
                }
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'clear success'
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'clear fail',
                    data:err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }
}

module.exports = TaskController;