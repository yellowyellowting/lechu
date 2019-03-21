import request from './request'

//前端请求文件汇总
// export const uploadRecipes = () => request('');//上传菜谱提交后立即展示到详情页
// export const uploadedRecipes = () => request('');//用户个人上传菜谱展示界面
// export const collectionRecipes = () => request('');//收藏界面

/**
 * 用户登录
 * 
 * @param {*} mobile 
 * @param {*} password 
 */
export const login = (mobile, password) => request('/user/login', { mobile, password }, 'POST');

/**
 * 用户注册
 * 
 * @param {*} mobile 
 * @param {*} code 
 * @param {*} password 
 */
export const register = (mobile, code, password) => request('/user/register', { mobile, code, password }, 'POST');

/**
 * 注册发送验证码
 * 
 * @param {*} mobile 
 */
export const sendSMSOfRegister = (mobile) => request('/user/sendSMS', { mobile }, 'POST');

/**
 * 获取流行菜谱
 */
export const getPopRecipes = () => request('/recipe/pop');

/**
 * 创建评论
 */
export const createReview = (obj) => request('/comment/create', obj , 'POST')

/**
 * 读取评论,
 */
export const getReview = (comments) => request('/comment/list' ,comments)

/**
 * 创建菜谱
 */
export const createRecipe = (recipeInfo) => request('/recipe/create', recipeInfo, 'POST');

/**
 * 创建收藏
 */
export const createCollection = (collection) => request('/recipe/collection', collection);
export const getCollection = () => request('/recipe/getcollection');
/**
 * 创建菜谱,跳转详情
 */
export const getRecipeDetail = (id) => request('/recipe/detail', { id }, 'GET');

/**
 * 获取自建菜谱
 */
export const getSelfRecipes = () => request('/recipe/self');

/**
 * 获取详情爬数据
 */

export const getspiderdetail = (id) => request('/spider/recipeDetail', {id});
