// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Feedback = Sequelize.import('../schema/feedback');
Feedback.sync({force: false}); //自动创建表

class FeedbackModel {
    /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Feedback.create(data);
    }
}

module.exports = FeedbackModel;