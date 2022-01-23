import Vue from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';

import VueApexCharts from 'vue-apexcharts'

import VueSweetalert2 from 'vue-sweetalert2';

Vue.config.productionTip = false
Vue.prototype.$developer = 'http://localhost:3000/'
Vue.prototype.$production = 'http://localhost:3000/'


Vue.use(VueSweetalert2);

Vue.use(VueApexCharts)

Vue.component('apexchart', VueApexCharts)

new Vue({
  render: h => h(App),
}).$mount('#app')
