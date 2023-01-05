import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/font/font.css'
import { Button, Popup, Field, DatetimePicker, Cell, CellGroup, Icon} from 'vant';
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Popup)
Vue.use(Field)
Vue.use(DatetimePicker)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
