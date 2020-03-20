const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('feedback',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        uuid:{
            type: DataTypes.STRING(36),
            allowNull: false,
            field: 'uuid'
        },
        title:{
            type: DataTypes.STRING(50),
            field:'title'
        },
        content:{
            type: DataTypes.STRING(200),
            field: 'content'
        },
        contact:{
            type: DataTypes.STRING(30),
            field: 'contact'
        },
        createdAt:{
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
        freezeTableName: true,
        timestamps: false
    });
}