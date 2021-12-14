import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import './plugins/vue-router'
import App from './App.vue'

import VueRouter from 'vue-router'
import { store } from './store/store'
import { routes } from './routes'

Vue.config.productionTip = false

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  render: h => h(App),
  store: store,
  router: router
}).$mount('#app')
