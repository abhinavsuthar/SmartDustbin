import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueResource from 'vue-resource'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.config.productionTip = false

// Vue Resource - HTTP
Vue.use(VueResource)
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `Bearer ${localStorage.getItem('token')}`)
  request.headers.set('Accept', 'application/json')
  next()
})

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyD28Rl8qNzfm0vlalAEed5aiQHjWp01VIs',
    libraries: 'places,drawing,visualization', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
  },
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
