

/**
 * 获取url的query数据
 */
export const getQueryString = (name) => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //获取id
    var r = window.location.search.substr(1).match(reg); //返回从？开始的url
    if (r != null) {
        return unescape(r[2]); //使用 unescape() 对其解码
    }
    return null;
}