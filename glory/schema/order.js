const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('order',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        period:{
            type: DataTypes.STRING(10),
            allowNull: false,
            field: 'period'
        },
        name:{
            type: DataTypes.STRING(20),
            allowNull: false,
            field:'name'
        },
        uuid:{
            type: DataTypes.STRING(36),
            allowNull: false,
            field: 'uuid'
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
        status:{
            type: DataTypes.STRING(1),
            defaultValue: 0,
            field:'status'
        },
        createdAt:{
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
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