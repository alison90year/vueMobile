import store from '../store'
import {router} from './index'

router.beforeEach((to, form, next) => {
  if (to.meta.login) { //判断前往的界面是否需要登录
    if (store.state.user.name) {  //是否已经登录
      next()
    } else {
      alert('请先登录')
    }
  } else {
    next()
  }
})
router.afterEach((to) => {
  if (to.meta.page) store.state.home.pageLoading = false
  document.title = to.name
})

export default router