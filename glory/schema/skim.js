const moment = require("moment");
module.exports = function(sequelize,DataTypes){
    return sequelize.define('skim',{
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
        imgUrl:{
            type: DataTypes.STRING(150),
            allowNull: false,
            field: 'imgUrl'
        },
        name:{
            type: DataTypes.STRING(20),
            allowNull: false,
            field:'name'
        },
        joinCount:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'joinCount'
        },
        winner: {   
            type: DataTypes.STRING(36),
            field:'winner'
        },
        closeDate:{
            type: DataTypes.DATE,
            allowNull: false,
            field: 'closeDate'
        },
        upperShelf:{
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            field: 'upperShelf'
        },
        createdAt:{
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
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