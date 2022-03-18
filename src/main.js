import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import "./assets/css/main.css";
import store from "./store";


Vue.config.productionTip = false
Vue.prototype.$evtBus = new Vue({});

new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app')