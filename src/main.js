import Vue from 'vue'
import App from './App.vue'

/** bah se faccio il prototype non riesce a leggerlo nel VUEX perché in Vuex il this è istance store, dovrei fare una roba ti this._vm che non mi piace  */
import axios from 'axios'
Vue.http = Vue.prototype.$http = axios


import env from '../config/env'
Vue.env = env


import router from './router'




import store from './store'

import moment from 'moment-timezone'
moment.tz.setDefault("Europe/Rome");



/** function for refresh token and get token */
if(localStorage.getItem('token')){
  store.dispatch('setLogged')
  Vue.http.defaults.headers.common['Authorization'] = "Bearer "+localStorage.getItem('token');

}






Vue.config.productionTip = false



Vue.http.interceptors.request.use(function (config) {
  store.dispatch('showLoading');
  return config;

  }, function (error) {

  store.dispatch('hideLoading');
  return Promise.reject(error);

});

Vue.http.interceptors.response.use(function (response) {
    // Do something with response data
    store.dispatch('hideLoading');
    return response;
  }, function (err) {
    // Do something with response error
    store.dispatch('hideLoading');
    return new Promise(function (resolve, reject) {
      if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
        this.$store.dispatch(logout)
      }
      throw err;
    });

  });

// });






new Vue({
  router,
  store,
  env,
  render: h => h(App)
}).$mount('#app')
