import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'
import store from './store'
import 'lib-flexible/flexible.js' //移动端适配
// 把封装好的文件下载挂载到vue上
import uploadFile from './utils/uploadFile'
Vue.prototype.$uploadFile = uploadFile

import { Button, Icon } from '@nutui/nutui';
Button.install(Vue);
Icon.install(Vue);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
