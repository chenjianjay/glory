const express = require('express')
const router = express.Router()
const db = require('../mysql')
const moment = require('moment')

// 增加皮肤，创建该期抽奖者表
router.post('/addSkim', function(req, res) {
    try {
        console.log(req.body)
        db.createTable(req.body, req.body.period)
        .then(result => {
            res.send(
                {
                    msg:'操作成功',
                    success: true,
                    data: result
                }
            )
        })
    } catch (error) {
        error.send(
            {
                msg: error,
                success: false
            }
        )
    }
})

// 参与
router.post('/joinDraw',async function(req, res) {
    try {
        const uuid = req.body.userInfo.uuid
        const period = req.body.period
        req.body.userInfo.createdAt = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        await db.insertRecord(req.body.userInfo, 'wz'+period)
        let credit = await db.query(`select credit from user where uuid='${uuid}'`)
        if (credit >= 50) {
            await db.updateCredit(uuid, period)
            await db.updateMenberCount(period)
            res.send()
        } else {
            res.send()
        }
       
    } catch (error) {
        res.send(
            {
                msg: error,
                success: false
            }
        )
    }
})

// 获取7个参与者
router.post('/getMember7ByPeriod', function(req, res){
    console.log(req.body.period)
    db.query7('wz'+req.body.period)
    .then(result => {
        res.send(
            JSON.stringify(
            {
                msg:'操作成功',
                data: result
            }
        ))
    })
    .catch(err => {
        res.send(
            JSON.stringify(
            {
                msg: err,
                success: false
            }
        ))
    })
})
// 分页获取全部
router.post('/getJoinMemberList', function(req, res){
    console.log(req.body)
    db.queryPage(req.body.page, 'wz'+req.body.period)
    .then(result => {
        console.log(result)
        res.send(
            JSON.stringify(
            {
                msg:'操作成功',
                data: result
            }
        ))
    })
    .catch(err => {
        res.send(
            JSON.stringify(
            {
                msg: err,
                success: false
            }
        ))
    })
})

module.exports = router;