<template>
  <router-link v-on:click.native="action" :to="to" id="back" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">
    <i class="material-icons">{{icon}}</i>
  </router-link>
</template>

<script>
  import firebase from 'firebase';
  export default {
    props: [
      'to',
      'icon',
      'disconnect'
    ],
    methods: {
      action: function() {
        if (this.disconnect) {
          firebase.auth().signOut()
        }
      }
    },
    data: function() {
      return {
      }
    }
  }
</script>

