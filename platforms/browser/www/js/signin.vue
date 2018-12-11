<template>
  <div id="signin">
    <div>
      <div>
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="email" v-model="email" id="username">
            <label class="mdl-textfield__label" for="username">Email</label>
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <input class="mdl-textfield__input" type="password" v-model="password" id="password">
            <label class="mdl-textfield__label" for="password">Password</label>
          </div>
        </form>
        <div class="button">
          <button v-on:click="signIn" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Sign In
          </button>
        </div>
      </div>
      <errorBox 
        v-bind:active="this.state.error"
        v-bind:message="this.state.message"
      ></errorBox>
    </div>
    <back 
      v-bind:to="'/signup'"
      v-bind:icon="'save_alt'"
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
      signIn: function() {
        firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
          user => {
            this.state.success = true;
            this.state.message = 'You are successfuly signed in !';
            setTimeout(_.bind(() => {
              this.state.success = false;
            }, this), 3000);
          },
          error => {
            this.state.error = true;
            this.state.message = error.message;
            setTimeout(_.bind(() => {
              this.state.error = false;
            }, this), 3000);
          }
        )
      }
    },
    data: () => {
      return {
        state: {
          error: false,
          success: false,
          message: ''
        },
        email: '',
        password: ''
      }
    }
  }
</script>
