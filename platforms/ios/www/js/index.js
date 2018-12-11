import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';

import Navigation from './navigation.vue';
import Home from './home.vue';
import Signin from './signin.vue';
import Signup from './signup.vue';
import Chat from './chat.vue';
import Back from './back.vue';

import navigationElem from './navigationElements.js'

Vue.use(VueRouter);

const routes = [
  { path: '/signin', component: Signin },
  { path: '/signup', component: Signup },
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
    router.push('chat');
  } else {
    router.push('signin');
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
      Chat,
      Navigation,
      Back,
    },
    methods: {
      updateCurrentPage: function(page) {
        this.currentPage = page;
      }
    },
    data: function() {
      return {
        currentPage: 'Sign In'
      }
    }
}).$mount('#vue-app')

router.afterEach((to, from, next) => {
  navigationElem.filter(el => el.url == to.fullPath);
  app.updateCurrentPage(navigationElem.filter(el => el.url == to.fullPath)[0].label)
})