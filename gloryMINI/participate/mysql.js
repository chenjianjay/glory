const mysql = require('mysql')
let db = {}
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'glory',
    port: 3306
})

db.createTable = function(result, table) {
    console.log('期次是 '+ table)
    return new Promise((resolve, reject) => {
        pool.query(`create table ${'wz'+table}(
            uuid varchar(36) not null,
            createdAt datetime not null,
            nickName varchar(100),
            avatarUrl varchar(100)
            )` , function (error, results) {
            if (error) {
                reject(error.message)
            } else {
                resolve(
                db.insert(result, 'skim')
                )
            }
        })
    })
}

db.query7 = function(table) {
    return new Promise((resolve, reject) => {
        const sql = `select avatarUrl from ${table} order by createdAt limit 1,7`
        pool.query(sql, function(error, result) {
            if (error) {
                reject(error.message)
            } else {
                resolve(JSON.parse(JSON.stringify(result)))
            }
        })
    })
}

db.queryPage = function(page, table) {
    return new Promise((resolve, reject) => {
        const start = (page.pageBegin -1) * page.pageNum
        const sql = `select createdAt,nickName,avatarUrl from ${table} order by createdAt desc limit ${start}, ${page.pageNum}`
        console.log(sql)
        pool.query(sql, function(error, result) {
            if (error) {
                console.log(error)
                reject(error.message)
            } else {
                resolve(JSON.parse(JSON.stringify(result)))
            }
        })
    })
}

db.insertRecord = function(set, table) {
    return new Promise((resolve, reject) => {
        pool.query(`insert into ${table} set ?`, set, function (error, result) {
            if (error) {
                console.log(error)
                reject(error.message)
            } else {
                console.log(result)
                resolve()
            }
        })
    })
}

db.updateCredit = function(uuid) {
    return new Promise((resolve, reject) => {
        const sql = `update user set credit=credit-50 where uuid='${uuid}'`
        pool.query(sql, function(error, result) {
            if (error) {
                console.log(error)
                reject(error.message)
            } else {
                resolve(JSON.parse(JSON.stringify(result)))
            }
        })
    })
}
db.updateMenberCount = function(period) {
    return new Promise((resolve, reject) => {
        const sql = `update skim set joinCount=joinCount+1 where period='${period}'`
        pool.query(sql, function(error, result) {
            if (error) {
                console.log(error)
                reject(error.message)
            } else {
                resolve()
            }
        })
    })
}

db.query = function(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function (error, result) {
            if (error) {
                console.log(error)
                reject(error.message)
            } else {
                resolve(JSON.parse(JSON.stringify(result))[0].credit)
            }
        })
    })
}


db.count = function(sql) {
    return new Promise((resolve, reject) => {
        pool.query(sql, function(error, result) {
            if (error) {
                console.log(error)
                reject(error.message)
            } else {
                resolve(JSON.parse(JSON.stringify(result))[0]['count(*)'])
            }
        })
    })
}

module.exports = db;