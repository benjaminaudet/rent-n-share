<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" id="nav">
        <header class="mdl-layout__header">
            <div  class="mdl-layout__header-row">
                <span class="mdl-layout-title">{{currentPage}}</span>
                <div class="mdl-layout-spacer"></div>
                <nav class="mdl-navigation"></nav>
            </div>
        </header>
        <div id="back-button" class="mdl-layout__drawer-button" v-on:click="back">
            <i class="material-icons">arrow_back</i>
        </div>
    </div>
</template>

<script>
  import _ from 'underscore';

  export default {
      props: [
          'currentPage',
      ],
      methods: {
        back: function() {
            this.$router.go(-1);
        },
      },
      data: function() {
          return {
          }
      }
  }
</script>


