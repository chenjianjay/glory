// 引入mysql的配置文件
const db = require('../config/db');
const s = require('sequelize')
// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Winner = Sequelize.import('../schema/winner');
Winner.sync({force: false}); //自动创建表

class WinnerModel {
    /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Winner.create(data);
    }

    static async get(){
        return await Winner.findAll({
            attribute: ['period', 'nickName'],
            order: [['period', 'DESC']],
            limit: 6
        })
    }

}

module.exports = WinnerModel;