<template>
  <div id="home">
    <div>
      <h1>Welcome bro</h1>
    </div>
    <div class="navigation">
        <div v-for="nav of navigation" v-if="!nav.global" class="button">
            <router-link :to="nav.url" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">
                <div class="material-icons">{{nav.icon}}</div>{{nav.label}}
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
    import Vue from 'vue';
    import navigation from './navigationElements.js';
  export default {
      data: () => {
        return {
            navigation: navigation
        }
    }
  }
</script>
