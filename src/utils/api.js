import request from './request'

export const getPopRecipes = () => request('/getPopRecipes');//流行菜谱
export const uploadRecipes = () => request('');//上传菜谱提交后立即展示到详情页
export const uploadedRecipes = () => request('');//用户个人上传菜谱展示界面
export const collectionRecipes = () => request('');//收藏界面