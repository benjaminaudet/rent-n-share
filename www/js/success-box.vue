<template>
  <div id="success-box" class="mdl-js-snackbar mdl-snackbar" v-bind:class="{'mdl-snackbar--active': this.active}">
    <div class="mdl-snackbar__text">{{message}}</div>
    <button class="mdl-snackbar__action" type="button"></button>
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'underscore';

export default {
  props: [
    'active',
    'message'
  ],
  data: () => {
    return {
    }
  }
}
</script>
