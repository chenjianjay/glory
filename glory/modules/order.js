// 引入mysql的配置文件
const db = require('../config/db');
const s = require('sequelize')
// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Order = Sequelize.import('../schema/order');
Order.sync({force: false}); //自动创建表

class OrderModel {
    /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
    static async create(data){
        return await Order.create(data);
    }

    /**
     * set type
     * @param {*} period 
     */
    static async setWinner(uuid, period){
        return await Order.update(
            {
                status: 2
            },
            {
                where:{
                    uuid,
                    period
                }
            }
        )
    }
    static async setFail(period){
        return await Order.update(
            {
                status: 1
            },
            {
                where:{
                    period
                }
            }
        )
    }
    /**
     * 查询7个头像
     * @param period
     * @returns {Promise<Model>} 
     */
    static async getSevenOrderByPeriod(period){
        return await Order.findAll({
            attributes: ['avatarUrl'],
            where:{
                period
            },
            limit:7
        });
    }

    /**
     * 查询参与者
     * @param period
     * @return {Promise<Model>}
     */
    static async getOrderByPeriod(period, page) {
        return await Order.findAndCountAll({
            attributes: ['avatarUrl', 'nickName', 'createdAt'],
            where: {
                period
            },
            limit: page.pageNum,
            offset: page.pageNum * (page.pageBegin - 1),
        })
    }

    /**
     * 查询记录
     * @param uuid
     * @return {Promise<Model>}
     */
    static async getRecordOrderByUUID(uuid, page, date) {
        return await Order.findAndCountAll({
            attributes: ['name', 'period', 'status', 'createdAt'],
            where: {
                uuid,
                period: {
                    [s.Op.like]: `${date}%`
                }
            },
            limit: page.pageNum,
            offset: page.pageNum * (page.pageBegin - 1),
        })
    }
}

module.exports = OrderModel;