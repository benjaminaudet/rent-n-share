import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Navigation from './navigation.vue';
import BackHeader from './backHeader.vue';
import Home from './home.vue';
import Signin from './signin.vue';
import Signup from './signup.vue';
import Onboarding from './onboarding.vue';
import Feed from './feed.vue';
import Order from './order.vue';
import OrderOwner from './order-owner.vue';
import ScanOrder from './scan-order.vue';
import Create from './create.vue';
import Chat from './chat.vue';
import Fab from './fab.vue';

import navigationElem from './navigationElements.js'

Vue.use(VueRouter);

localStorage.clear();

const routes = [
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
  { path: '/onboarding', component: Onboarding },
  { path: '/feed', component: Feed, meta: { requiresAuth: true } },
  { name: 'order', path: '/order/:id', component: Order, meta: { requiresAuth: true } },
  { name: 'order-owner', path: '/order-owner/:id', component: OrderOwner, meta: { requiresAuth: true } },
  { name: 'scan-order', path: '/scan-order/:id', component: ScanOrder, meta: { requiresAuth: true } },
  { path: '/create', component: Create, meta: { requiresAuth: true } },
  { path: '/chat', component: Chat, meta: { requiresAuth: true } },
  { path: '*', redirect: '/signin' }
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('/signin')
  } else {
    next();
  }
})

firebase.initializeApp({
  apiKey: "AIzaSyBvD7dIywvP6PWt5EaGkOClwG-xTvVLtTg",
  authDomain: "lab-3-ju.firebaseapp.com",
  databaseURL: "https://lab-3-ju.firebaseio.com",
  projectId: "lab-3-ju",
  storageBucket: "lab-3-ju.appspot.com",
  messagingSenderId: "17396481053"
});

const firestore = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
firestore.settings(settings);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    router.push('feed');
  } else {
    if (localStorage.getItem('onboardingDone')) {
      if (localStorage.getItem('signedUp')) {
        router.push('signin');
      } else {
        router.push('signup');
      }
    } else {
      router.push('onboarding');
    }
  }
});

Vue.filter('capitalize', function (value) {
  if (!value) return ''
  value = value.toString()
  return value.charAt(0).toUpperCase() + value.slice(1)
})

const app = new Vue({
    router,
    components: { 
      Home,
      Signin,
      Signup,
      Onboarding,
      Feed,
      Order,
      OrderOwner,
      ScanOrder,
      Create,
      Chat,
      Navigation,
      BackHeader,
      Fab,
    },
    methods: {
      updateCurrentPage: function(page) {
        this.currentPage = page.label;
        this.nav = page.nav ? page.nav : 'nav';
      }
    },
    data: function() {
      return {
        currentPage: localStorage.getItem('signedUp') ? 'Sign In' : 'Sign Up',
        nav: localStorage.getItem('onboardingDone') ? 'nav' : 'none'
      }
    }
}).$mount('#vue-app')

router.afterEach((to, from, next) => {
  app.updateCurrentPage(navigationElem.filter(el => el.url == `/${to.fullPath.split('/')[1]}`)[0])
})