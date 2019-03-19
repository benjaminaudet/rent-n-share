<template>
  <div id="feed">
    <div id="content">
      <ul id="feed" class="demo-list-three mdl-list">
        <div
          v-for="announce in announces"
          class="demo-card-wide mdl-card mdl-shadow--2dp"
          v-on:click="displayOrder(announce.id)"
        >
          <div
            class="mdl-card__title"
            v-bind:style="{ backgroundImage: `url('${announce.cover}')` }"
          >
            <h2 class="mdl-card__title-text">{{announce.title}}</h2>
          </div>
          <div class="mdl-card__supporting-text">{{announce.description}}</div>
        </div>
      </ul>
    </div>
    <fab></fab>
  </div>
</template>

<script>
import _ from "underscore";
import fab from "./fab.vue";
import message from "./message.vue";
import firebase from "firebase";

export default {
  created: function() {
    let db = firebase.firestore();

    this.snapshot = db
      .collection("announces")
      .orderBy("created_at")
      .onSnapshot(
        _.bind(function(querySnapshot) {
          this.announces = [];
          let announcesGlobal = this.announces;
          querySnapshot.forEach(function(doc) {
            announcesGlobal.push({ ...doc.data(), id: doc.id });
          });
        }, this)
      );
  },
  destroyed: function() {
    this.snapshot();
  },
  methods: {
    displayOrder: function(id) {
      console.log(id);
      this.$router.push({ name: "order", params: { id: id } });
    }
  },
  components: {
    message,
    fab
  },
  data: function() {
    return {
      input: "",
      announces: [],
      snapshot: null
    };
  }
};
</script>
