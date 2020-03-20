const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const Skim = Sequelize.import('../schema/skim');
Skim.sync({force: false}); //自动创建表

class SkimModel {
    /**
     * 创建
     * @param data
     * @returns {Promise<*>}
     */
    static async createSkim(data){
        return await Skim.create(data);
    }
    static async addJoinCount(period) {
        return await Skim.update(
            { 
                joinCount: Sequelize.literal('joinCount+1')
            },
            { 
                where: {
                    period
                } 
            }
        )
    }

    /**
     * 查询
     * @param uuid
     * @returns {Promise<Model>}
     */
    static async setWinner(winner, period) {
        return await Skim.update(
            {
                winner,
                upperShelf: false
            },
            {
                where:{
                    period
                }
            }
        )
    }

    static async getSkims() {
        return await Skim.findAll({
            attributes: ['period', 'imgUrl', 'name', 'joinCount', 'closeDate'],
            'order': [
                'closeDate'
            ],
            where: {
                upperShelf: true
            }
        })
    }
}

module.exports = SkimModel;