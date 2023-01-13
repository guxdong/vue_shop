import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  }, 
  {
    path: '/', 
    redirect: '/login'
  }, 
  {
    path: '/home',
    component: Home, 
    redirect: '/welcome', 
    children: [
        {
            path: '/welcome', 
            component: Welcome
        }, 
        {
            path: '/users', 
            component: Users
        }
    ]
  }, 
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
    // to 将要访问的路径
    // from 从哪个路径跳转
    // next是一个函数，表示放行，next('/login')表示强制跳转
    if (to.path === '/login') return next()
    // 获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login')
    next()
})

export default router
