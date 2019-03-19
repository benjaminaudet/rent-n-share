<template>
  <div id="qrcode"></div>
</template>

<script>
import _ from "underscore";
import firebase from "firebase";

export default {
  mounted: function() {
    new QRCode(document.getElementById("qrcode"), this.$route.params.id);
  },
  components: {},
  data: function() {
    return {};
  }
};
</script>
