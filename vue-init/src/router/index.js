import Vue from 'vue'
import Router from "vue-router";

Vue.use(Router)
const _import_ = file => () => import('views/'+file)

export const constantRouterMap = [
  {
    path:'/',
    name:'App',
    component:_import_('Home/index')
  }
]
export const router = new Router({
  mode: 'history',
  routes: constantRouterMap
})

export default router