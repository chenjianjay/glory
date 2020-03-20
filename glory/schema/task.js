module.exports = function(sequelize,DataTypes){
    return sequelize.define('task',{
        uuid:{
            type: DataTypes.STRING(36),
            allowNull: false,
            primaryKey: true
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
        credit:{
            type: DataTypes.INTEGER,
            defaultValue: 50,
            field: 'credit'
        },
        // 每日 签到
        dailyCheckIn:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'dailyCheckIn'
        },
        // 每日 看视频 无限次
        dailyWatchVideoTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'dailyWatchVideoTimes'
        },
        // 每日 邀请
        dailyInviteTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'dailyInviteTimes'
        },
        // 每日 分享
        dailyShare:{
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field:'dailyShare'
        },

        // 每周 邀请好友
        weeklyInviteTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'weeklyInviteTimes'
        },

        // 挑战 抽奖次数
        totalDrawTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'totalDrawTimes'
        },
        // 挑战 邀请好友
        totalInviteTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'totalInviteTimes'
        },
        // 观看次数
        totalWatchVideoTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'totalWatchVideoTimes'
        },
        // 签到次数
        totalCheckInTimes:{
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field:'totalCheckInTimes'
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