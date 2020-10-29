import Vue from 'vue'
import Router from "vue-router";

Vue.use(Router)
const _import_ = file => () => import('views/'+file)

export const constantRouterMap = [
  {
    path:'/',
    name:'首页',
    meta:{page:true},
    component:_import_('Layout/index')
  },
  {
    path:'/home',
    name:'家里',
    component:_import_('Home/index')
  }
]
export const router = new Router({
  mode: 'history',
  routes: constantRouterMap
})

