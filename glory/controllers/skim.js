const moment = require("moment");
const SkimModel = require("../modules/skim");

class SkimController {
    /**
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        let req = ctx.request.body;
console.log(req)
        req.closeDate =  moment(req.closeDate).format('YYYY-MM-DD HH:mm:ss')
        if(req.period && req.imgUrl && req.name && req.closeDate){
            try{
                const ret = await SkimModel.createSkim(req);
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'create success'
                }
            }catch(err){
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
    static async update(ctx){
        let body = ctx.request.body
        const uuid = body.uuid
console.log(body)
        let data
        if(body && uuid){
            try{
                switch (true) {
                    case Object.hasOwnProperty('winner'):
                        data = await SkimModel.setWinner(body.winner, uuid);
                        break;
                    case Object.hasOwnProperty('closeDate'):
                        data = await SkimModel.setCloseDate(body.closeDate, uuid);
                        break;
                    default:
                        break;
                }
                let data = await SkimModel.setWinner(value, uuid);
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'update success',
                    data
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'update fail',
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

    static async getSkims(ctx){
        try{
            let data = await SkimModel.getSkims();
            // data = data.map(item=>{
            //     item.closeDate = moment(item.closeDate).format('YYYY-MM-DD HH:mm:ss')
            //     return item
            // })
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

module.exports = SkimController;