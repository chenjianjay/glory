const baseUrl = 'http://localhost:3003/glory'; 
// const baseUrl = 'https://www.mynne.cn/glory'; 

module.exports = (url, data) => {
	let httpDefaultOpts = {
		url: baseUrl + url,
		data: JSON.stringify(data) || '',
		method: 'POST'
	}
    let promise = new Promise(function(resolve, reject) {
        uni.request(httpDefaultOpts).then(
            (res) => {
				res = res[1]
				if (res.statusCode == 200) {
					resolve(res.data)
				} else if (res.statusCode == 412 || res.statusCode == 416) {
					console.log(res.data.msg);
					reject(res.data.msg)
				}else {
					reject()
				}
            }
        ).catch(
            (response) => {
				console.log(response)
                reject(response)
            }
        )
    })
    return promise
}
