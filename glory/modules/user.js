// 引入mysql的配置文件
const db = require('../config/db');

// 引入sequelize对象
const Sequelize = db.sequelize;

// 引入数据表模型
const User = Sequelize.import('../schema/user');
User.sync({force: false}); //自动创建表

class UserModel {
    /**
     * 创建用户
     * @param data
     * @returns {Promise<*>}
     */
    static async createUser(data){
        return await User.create(data);
    }

    /**
     * 更新用户详情
     * @param {...}
     * @return {Promise<Model>}
     */
    static async updateUser(columns, uuid) {
        return await User.update(
            columns,
            {
                where:{
                    uuid
                }
            }
        )
    }
}

module.exports = UserModel;