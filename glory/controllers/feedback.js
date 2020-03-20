const FeedbackModel = require("../modules/feedback");

class FeedbackController {
    /**
     * create
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        let req = ctx.request.body;
        console.log(req)
        if(req.uuid){
            try{
                await FeedbackModel.create(req);
                //return uuid
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'commit success'
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'commit fail',
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

module.exports = FeedbackController;