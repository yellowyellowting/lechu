import { baseUrl } from '../config/env';

// 前端请求配置
export default (url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url;

	if (type == 'GET') {
		let dataStr = ''; //数据拼接字符串
		data && Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})

		if (dataStr !== '') {
			dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
			url = url + '?' + dataStr;
		}
	}

	return new Promise((resolve, reject) => {
		if (window.fetch && method == 'fetch') {
			let requestConfig = {
				// credentials: 'include',
				method: type,
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
					'x-access-token': localStorage.getItem('token'),
				},
				mode: "cors",
				cache: "force-cache"
			}

			if (type == 'POST') {
				Object.defineProperty(requestConfig, 'body', {
					value: JSON.stringify(data)
				})
			}

			fetch(url, requestConfig)
				.then(response => response.json())
				.then(result => {
					if (result.code == 0) {
						resolve(result.data);
					} else {
						reject(result.message);
					}
				})
				.catch(error => {
					reject(error);
				});
		} else {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		}
	});
}