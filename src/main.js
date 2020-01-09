import 'babel-polyfill';
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App';
import router from './router/client';
import store from './store';

import './assets/css/common.less';
import './assets/font/iconfont.css';
import axios from 'axios'
Vue.use(ElementUI);
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
Vue.config.productionTip = false;
Vue.prototype.HOST='/api';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
