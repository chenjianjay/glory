// const runSchedule = require('./schedule')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())//获取JSON解析器中间件  
app.use(bodyParser.urlencoded({ extended: false }))//url-encoded解析器  

app.use("/glory", require("./router/joinDraw"));

app.listen('3004','192.168.124.16', () => {
    console.log('listen: 3004');
    // 开启自动脚本
    //  runSchedule(function() {
    // })
});
