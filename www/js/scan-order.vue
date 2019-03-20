<template>
  <div></div>
</template>

<script>
import _ from "underscore";
import firebase from "firebase";
import QrScanner from "./libs/qr-scanner.min.js";

export default {
  mounted: function() {
    let id = this.$route.params.id;
    const contentType = "image/png";
    navigator.camera.getPicture(
      onSuccess,
      () => alert("error happended when trying to open camera"),
      { quality: 100, destinationType: Camera.DestinationType.DATA_URL }
    );

    function onSuccess(imageData) {
      let imageURI = "data:image/jpeg;base64," + imageData;
      function decodeImageFromBase64(data, callback) {
        // set callback
        window.qrcode.callback = callback;
        // Start decoding
        window.qrcode.decode(data);
      }
      decodeImageFromBase64(imageURI, function(decodedInformation) {
        if (decodedInformation.includes("error")) {
          alert(decodedInformation);
        } else if (decodedInformation == id) {
          alert("QR successfully scanned, your order is active now!");
        } else {
          alert("Fail! You have to scan the QR Code of the order!");
        }
      });
    }
  },
  methods: {},
  data: function() {
    return {};
  }
};
</script>
