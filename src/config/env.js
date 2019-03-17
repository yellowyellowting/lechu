const DEVELOP_HOST = 'https://www.easy-mock.com/mock/5c89ec568b272d3a471ce06e/luchu';//'http://127.0.0.1:3000';//开发地址
const RELEASE_HOST = 'http://118.24.134.191/lechu-api';//部署服务器地址

//process.env node的内置环境变量，只要在node环境下运行就含有process对象以及env属性 
//.NODE_ENV 自己命名
//导出一个常量baseUrl；判断process.env.NODE_ENV是否等于production模式，不是的话便赋值为本地开发模式，不是的话便为发布模式，地址为部署的服务器地址
export const baseUrl = process.env.NODE_ENV === 'production' ? RELEASE_HOST : DEVELOP_HOST;
