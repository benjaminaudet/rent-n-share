<template>
  <div id="signup">
    <div>
      <div>
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" v-model="username" type="text" id="username">
            <label class="mdl-textfield__label" for="username">Username</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" v-model="email" type="email" id="email">
            <label class="mdl-textfield__label" for="email">Email</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" v-model="password" type="password" id="password">
            <label class="mdl-textfield__label" for="password">Password</label>
          </div>
        </form>
        <div class="button">
          <button v-on:click="signUp" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Sign Up
          </button>
        </div>
      </div>
      <errorBox 
        v-bind:active="this.error.active"
        v-bind:message="this.error.message"
      ></errorBox>
    </div>
    <back 
      v-bind:to="'/signin'"
      v-bind:icon="'forward'"
    ></back>
  </div>
</template>

<script>
  import _ from 'underscore';
  import firebase from 'firebase';
  import back from './back.vue';
  import errorBox from './error-box.vue';

  export default {
    components: {
      back,
      errorBox
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
          user => {
            user = firebase.auth().currentUser;
            user.updateProfile({
              displayName: this.username,
            }).then(function() {
              
            }).catch(function(error) {
              console.error('error on display name updating')
            });
          },
          error => {
            this.error.active = true;
            this.error.message = error.message;
            setTimeout(_.bind(() => {
              this.error.active = false;
            }, this), 3000);
          }
        )
      }
    },
    data: () => {
      return {
        error: {
          active: false,
          message: ''
        },
        username: '',
        email: '',
        password: ''
      }
    }
  }
</script>
