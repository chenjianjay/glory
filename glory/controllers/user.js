const UserModel = require("../modules/user");
const TaskModel = require("../modules/task");

class UserController {
    /**
     * create a user
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        let req = ctx.request.body;
console.log(req)
        if(req.nickName && req.avatarUrl){
            try{
                const ret = await UserModel.createUser(req);
                req.uuid = ret.uuid
                await TaskModel.initTask(req)
                const task = await TaskModel.getTask(req.uuid)
                if (req.parentUUID) {
                    // 是邀请的，先+1，再看是否满足送积分条件
                    await TaskModel.update({
                        dailyInviteTimes: Sequelize.literal(`dailyInviteTimes+1`),
                        weeklyInviteTimes: Sequelize.literal(`weeklyInviteTimes+1`),
                        totalInviteTimes: Sequelize.literal(`totalInviteTimes+1`)
                        },
                        req.uuid
                        )
                    let res = await TaskModel.getOne(['dailyInviteTimes', 'weeklyInviteTimes'], req.uuid)
                    if (res.dailyInviteTimes == 2) {
                        await TaskModel.update({
                            credit: Sequelize.literal(`credit+20}`)
                        })
                    } else if (res.weeklyInviteTimes == 15){
                        await TaskModel.update({
                            credit: Sequelize.literal(`credit+50}`)
                        })
                    }
                }
                //return uuid
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'login success',
                    data: {
                        uuid: ret.uuid,
                        uid: ret.uid,
                        task
                    }
                }
            }catch(err){
                console.log(err)
                ctx.response.status = 412;
                ctx.body = {
                    msg: 'login fail',
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
     * update user
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async update(ctx){
        let body = ctx.request.body
        console.log(body)
        if(body.data && body.uuid){
            try{
                const columns = {
                    avatarUrl: body.data.avatarUrl,
                    nickName: body.data.nickName
                }
                await UserModel.updateUser(body.data, body.uuid);
                await TaskModel.update(columns, body.uuid)
                let task = await TaskModel.getTask(body.uuid)
                ctx.response.status = 200;
                ctx.body = {
                    msg: 'update success',
                    task
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
}

module.exports = UserController;