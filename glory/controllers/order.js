const moment = require("moment");
const Sequelize = require("sequelize")

const OrderModel = require("../modules/order");
const SkimModel = require("../modules/skim")
const TaskModel = require("../modules/task")

class OrderController {
    /**
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        let body = ctx.request.body;
console.log(body)
        if(body.uuid && body.period && body.nickName && body.avatarUrl){
            try{
                // 先判断
                let has = await TaskModel.getOne(['credit'], body.uuid)
                if (has<=50) {
                    ctx.response.status = 412;
                    ctx.body = {
                        msg: '您的积分少于50'
                    }
                    return
                }
                await OrderModel.create(body);
                await SkimModel.addJoinCount(body.period)
                await TaskModel.update({
                    credit: Sequelize.literal(`credit-50`),
                    totalDrawTimes: Sequelize.literal(`totalDrawTimes+1`)
                }, body.uuid)
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'create success'
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'create fail',
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }

    /**
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async getSevenByPeriod(ctx){
        let period = ctx.request.body.period
console.log(ctx.request.body)
        if(period){
            try{
                let data = await OrderModel.getSevenOrderByPeriod(period);
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
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }

    static async getOrderByPeriod(ctx){
        let body = ctx.request.body
console.log(body)
        if(body.period && body.page){
            try{
                let data = await OrderModel.getOrderByPeriod(body.period, body.page);
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
                    data: err
                }
            }
        }else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }

    static async getRecordList(ctx){
        let body = ctx.request.body
console.log(body)
        if(body.page && body.uuid && body.date){
            try{
                let data = await OrderModel.getRecordOrderByUUID(body.uuid, body.page, '2020'+body.date);
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
                    data: err
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

module.exports = OrderController;