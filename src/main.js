import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './router'
import { getDictData } from "@/api/system/dict/data"
import { selectDictLabel } from "@/utils/ruoyi"

//全局方法挂载
Vue.prototype.getDictData = getDictData
Vue.prototype.selectDictLabel = selectDictLabel

Vue.config.productionTip = false
Vue.use(ElementUI)

require('./mock/mock')

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
