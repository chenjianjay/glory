// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Task = Sequelize.import('../schema/task');
Task.sync({force: false}); //自动创建表

class TaskModel {
    /**
     * 初始化任务
     * @param uuid
     * @returns {Promise<*>}
     */
    static async initTask(uuid){
        return await Task.create(uuid);
    }

    /**
     * 查询
     * @param uuid
     * @returns {Promise<Model>}
     */
    static async getTask(uuid){
        return await Task.findOne({
            attributes: ['credit', 'dailyCheckIn', 'dailyWatchVideoTimes', 'dailyInviteTimes', 'dailyShare',
                'weeklyInviteTimes',
                'totalDrawTimes', 'totalInviteTimes','totalWatchVideoTimes', 'totalCheckInTimes'],
            where:{
                uuid
            }
        });
    }

    /**
     * 更新用户详情
     * @param {...}
     * @return {Promise<Model>}
     */
    static async update(col, uuid) {
        return await Task.update(
            col,
            { 
                where: {
                    uuid
                } 
            }
        )
    }

    static async getOne(col, uuid) {
        return await Task.findOne({
            attributes: col,
            where: {
                uuid
            }
        })
    }

    static async clearDaily() {
        return await Task.update(
            {
                'dailyCheckIn': false,
                'dailyWatchVideoTimes': 0,
                'dailyInviteTimes': 0,
                'dailyShare': false
            },{
                where: {}
            }
        )
    }
    static async clearWeekly() {
        return await Task.update(
            {
                'dailyCheckIn': false,
                'dailyWatchVideoTimes': 0,
                'dailyInviteTimes': 0,
                'dailyShare': false,
                'weeklyInviteTimes': 0
            },{
                where: {}
            }
        )
    }
}

module.exports = TaskModel;