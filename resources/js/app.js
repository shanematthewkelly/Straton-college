require('./bootstrap');
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Vuelidate from 'vuelidate'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.use(Vuelidate)

Vue.use(BootstrapVue)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
