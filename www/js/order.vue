<template>
  <div id="order">
    <div id="order-image">
      <img v-bind:src="announce.cover" alt>
    </div>
    <div id="content">
      <h1>{{announce.title}}</h1>
      <p>{{announce.description}}</p>
      <div id="infos">
        <ul>
          <li>
            <span>
              <i class="far fa-clock"></i> 1 week
            </span>
          </li>
          <li>
            <span>
              <i class="fas fa-clock"></i>
              {{announce.last}} week
            </span>
          </li>
          <li>
            <span>
              <i class="fas fa-tags"></i>
              {{announce.price}}:-
            </span>
          </li>
          <li>
            <span>
              <i class="fas fa-life-ring"></i>
              {{announce.price}}:-
            </span>
          </li>
          <li>
            <span>
              <i class="fas fa-map-marker-alt"></i>
              {{announce.meetingLocation}}
            </span>
          </li>
        </ul>
      </div>
      <div v-show="announce.id" class="button">
        <button
          v-on:click="goQRCode"
          class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
        >ORDER</button>
      </div>
    </div>
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

    db.collection("announces")
      .doc(this.$route.params.id)
      .get()
      .then(
        _.bind(function(doc) {
          this.announce = doc.data();
          this.announce.id = doc.id;
          this.announce.last = this.diffWeeks(
            new Date(this.announce.to.seconds * 1000),
            new Date(this.announce.from.seconds * 1000)
          );
        }, this)
      );
  },
  mounted: function() {},
  computed: {
    setCoverImage: function() {}
  },
  methods: {
    diffWeeks: function(dt2, dt1) {
      var diff = (dt2.getTime() - dt1.getTime()) / 1000;
      diff /= 60 * 60 * 24 * 7;
      return Math.abs(Math.round(diff));
    },
    goQRCode: function() {
      if (firebase.auth().currentUser.email == this.announce.author) {
        this.$router.push({
          name: "order-owner",
          params: { id: this.announce.id }
        });
      } else {
        this.$router.push({
          name: "scan-order",
          params: { id: this.announce.id }
        });
      }
    }
  },
  components: {
    message,
    fab
  },
  data: function() {
    return {
      announce: {}
    };
  }
};
</script>

