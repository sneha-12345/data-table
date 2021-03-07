// import axios from 'axios';
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(require('vue-faker'))
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import vuetify from '@/plugins/vuetify' // path to vuetify export





Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");