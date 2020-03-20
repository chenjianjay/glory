const SkimModel = require("../modules/skim");
const WinnerModel = require("../modules/winner");
const OrderModel = require("../modules/order")
class WinnerController {
    static async create(ctx){
        let body = ctx.request.body
        console.log(body)
        if(body.period && body.nickName && body.uuid) {
            try{
                await OrderModel.setFail(body.period)
                await OrderModel.setWinner(body.uuid ,body.period)
                await SkimModel.setWinner(body.uuid ,body.period)
                let data = await WinnerModel.create(body)   
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'create success',
                    data
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'create fail',
                    data: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                msg: 'incomplete parameters'
            }
        }
    }

    static async get(ctx){
        try{
            let data = await WinnerModel.get()
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
    }
}

module.exports = WinnerController;