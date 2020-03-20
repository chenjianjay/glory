const request = require('request');
module.exports =function doRequest(type){
    return new Promise((resolve, reject)=>{
        request({
            url: 'http://192.168.0.87:3003/glory/task/clear',
            method: 'POST',
            body: JSON.stringify(type),
            headers: {//设置请求头
                "content-type": "application/json",
            }
        }, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}
