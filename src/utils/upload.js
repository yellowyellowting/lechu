import { baseUrl } from '../config/env';

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}
/*
option {
    withCredentials: Boolean,
    headers: Object,
    onProgress: (event: { percent: number }): void,
}
*/
export default (url, file, data, option) => {
    return new Promise((resolve, reject) => {
        url = baseUrl + url;
        
        const xhr = new XMLHttpRequest();

        if (option && option.onProgress && xhr.upload) {
            xhr.upload.onprogress = function progress(e) {
                if (e.total > 0) {
                    e.percent = e.loaded / e.total * 100;
                }
                option.onProgress(e);
            };
        }

        const formData = new FormData();

        if (data) {
            Object.keys(data).map(key => {
                formData.append(key, data[key]);
            });
        }

        formData.append(file.name, file);

        xhr.onerror = function error(e) {
            reject(e);
        };

        xhr.onload = function onload() {
            // allow success when 2xx status
            if (xhr.status < 200 || xhr.status >= 300) {
                reject(`annot post ${url} ${xhr.status}`);
            } else {
                resolve(getBody(xhr));
            }
        };


        xhr.open('post', url, true);

        // Has to be after `.open()`. See https://github.com/enyo/dropzone/issues/179
        if (option && option.withCredentials && 'withCredentials' in xhr) {
            xhr.withCredentials = true;
        }

        const headers = (option && option.headers) || {};

        // when set headers['X-Requested-With'] = null , can close default XHR header
        // see https://github.com/react-component/upload/issues/33
        if (headers['X-Requested-With'] !== null) {
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }

        for (const h in headers) {
            if (headers.hasOwnProperty(h) && headers[h] !== null) {
                xhr.setRequestHeader(h, headers[h]);
            }
        }
        xhr.send(formData);
    });
}