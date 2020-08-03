import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import locolizeFilter from './filters/locolize.filter'
import messagePlugin from './plugins/message.plugin'
import tooltipDirective from './directives/tooltip.directive'
import Loader from './components/app/Loader'
import Paginate from 'vuejs-paginate'
import './registerServiceWorker'
import 'materialize-css/dist/js/materialize.min'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/analytics'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.filter('locolize', locolizeFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)
Vue.component('Paginate', Paginate)

const firebaseConfig = {
  apiKey: "AIzaSyBguk5DusdRwg3ye1ZDOglHs3TIvqcDFIo",
  authDomain: "vue-mycrm-project.firebaseapp.com",
  databaseURL: "https://vue-mycrm-project.firebaseio.com",
  projectId: "vue-mycrm-project",
  storageBucket: "vue-mycrm-project.appspot.com",
  messagingSenderId: "788888885028",
  appId: "1:788888885028:web:214a1e8fa3df25309945b1",
  measurementId: "G-3F7D504K90"
};

firebase.initializeApp(firebaseConfig)
firebase.analytics()

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})


