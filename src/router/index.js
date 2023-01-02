import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store/index.js'
import home from '../views/guest/home.vue'
import RegisterView from '../views/guest/register.vue'
import UserLoginView from '../views/guest/login.vue'
import hotelInfo from '../views/guest/hotel.vue'
import search from '../views/guest/search.vue'
import personalCenter from '../views/guest/personalCenter.vue'

import login from '../views/hotel/login.vue'
import checkIn from '../views/hotel/checkIn.vue'
import checkOut from '../views/hotel/checkOut.vue'
import settle from '../views/hotel/settle.vue'
import hotelhome from '../views/hotel/home.vue'
import basicInfoManage from '../views/hotel/basicInfoManage.vue'
import roomInfoManage from '../views/hotel/roomInfoManage.vue'
import commentManage from '../views/hotel/commentManage.vue'

const routes = [
  {
    path: '/',
    component: home
  },
  {
    path: '/register',
    name:'register',
    component: RegisterView
  },
  {
    path: '/login',
    name:'login',
    component: UserLoginView
  },
  {
    path: '/room',
    component: hotelInfo
  },
  {
    path: '/search',
    component: search
  },
  {
    path: '/login_h',
    component: login
  },
  {
    path: '/hotel/checkIn',
    component: checkIn
  },
  {
    path: '/hotel/checkOut',
    component: checkOut
  },
  {
    path: '/settled',
    component: settle
  },
  {
    path: '/ads',
    component: hotelhome
  },
  {
    path: '/hotel/basicInfoManage',
    component: basicInfoManage
  },
  {
    path: '/hotel/roomInfoManage',
    component: roomInfoManage
  },
  {
    path: '/user/personalCenter',
    component: personalCenter
  },
  {
    path: '/hotel/commentManage',
    component: commentManage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 导航守卫 没有登录的时候不能访问相关网页
router.beforeEach((to,from,next) => {
  if(to.path.substring(0,6) === '/user/' && store.state.type != "user"){
    window.alert("请先登录")
    next("/login")
    store.state.lastPage = to.path
  }
  else if(to.path.substring(0,7) === '/hotel/' && store.state.type != "hotel"){
    window.alert("请以酒店身份登录")
    next("/login_h")
    store.state.lastPage = to.path
  }
  else{
    next();
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0,0)
})

export default router