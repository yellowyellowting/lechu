import request from './request'

//前端请求路径汇总

/**
 * 用户登录
 * 
 */
export const login = (mobile, password) => request('/user/login', { mobile, password }, 'POST');

/**
 * 用户注册
 * 
 */
export const register = (mobile, code, password) => request('/user/register', { mobile, code, password }, 'POST');

/**
 * 注册发送验证码
 * 
 */
export const sendSMSOfRegister = (mobile) => request('/user/sendSMS', { mobile }, 'POST');

/**
 * 获取流行菜谱
 */
export const getPopRecipes = () => request('/recipe/pop');

/**
 * 创建评论
 */
export const createReview = (obj) => request('/comment/create', obj, 'POST')

/**
 * 读取评论,
 */
export const getReview = (comments) => request('/comment/list', comments)

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

export const getspiderdetail = (id) => request('/spider/recipeDetail', { id });
