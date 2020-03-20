const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('user',{
        // uuid,用于接口
        uuid: {
            type: DataTypes.UUID(36),
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        // 用户id，给用户看看
        uid:{
            type: DataTypes.STRING(20),
            defaultValue: function() {
                return Number(Math.random().toString().substr(3) + Date.now()).toString(36)
            }
        },
        avatarUrl: {
            type: DataTypes.STRING(150),
            allowNull: false,
            field: 'avatarUrl'
        },
        nickName:{
            type: DataTypes.STRING(50),
            allowNull: false,
            field: 'nickName'
        },
        city: {
            type: DataTypes.STRING(10),
            field: 'city'
        },
        country:{
            type: DataTypes.STRING(10),
            field: 'country'
        },
        province:{
            type: DataTypes.STRING(10),
            field: 'province'
        },
        age:{
            type: DataTypes.INTEGER,
            field: 'age'
        },
        //邀请人
        parentUUID:{
            type: DataTypes.STRING(36),
            field: 'parentUUID'
        },
        createdAt:{
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        // 更新时间
        updatedAt:{
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },{
        /**
         * 如果为true，则表示名称和model相同，即user
         * 如果为fasle，mysql创建的表名称会是复数，即users
         * 如果指定的表名称本身就是复数，则形式不变
         */
        freezeTableName: true
    });
}