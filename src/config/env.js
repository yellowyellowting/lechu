const DEVELOP_HOST = 'http://127.0.0.1:3000';//开发地址
const RELEASE_HOST = 'http://118.24.134.191/lechu-api';//部署地址

//process.env node的内置环境变量，只要在node环境下运行就含有process对象以及env属性 
//.NODE_ENV 
export const baseUrl = process.env.NODE_ENV === 'production' ? RELEASE_HOST : DEVELOP_HOST;