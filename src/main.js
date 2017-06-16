// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import store from './vuex/store'

import './unit/const';
import './control';
import { subscribeRecord } from './unit';
window.store=store
subscribeRecord(store); // 将更新的状态记录到localStorage
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#root',
  render: h => h(App),
  store: store
})
