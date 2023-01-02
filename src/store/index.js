import { createStore } from 'vuex'

export default createStore({
  state: {
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '', // token
    nickName:localStorage.getItem('nickName') ? localStorage.getItem('nickName') : '', // 用户昵称
    type:localStorage.getItem('type') ? localStorage.getItem('type') : '',  // 用户类型标注,未登录为空,普通用户为user,酒店为hotel 前端调试测试时记得修改
    lastPage:"", // 跳转至登录页前的网页地址记录,登录完毕后跳回来
    hotelName:"" // 酒店名称
  },
  getters: {
  },
  mutations: {
    logout(state){
      state.type = ""
      state.nickName = ""
      state.Authorization = ""
      localStorage.setItem('Authorization',"")
      localStorage.setItem('type',"")
      localStorage.setItem('nickName',"")
    }
  },
  actions: {
  },
  modules: {
  }
})
