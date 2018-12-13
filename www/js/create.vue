<template>
  <div id="create">
    <div>
      <div>
        <form action="#">
          <div class="mdl-textfield mdl-js-textfield">
            <span class="input-label">Title</span>
            <input class="mdl-textfield__input" type="text" v-model="title" id="title">
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <span class="input-label">Description</span>
            <input class="mdl-textfield__input" type="text" v-model="description" id="description">
          </div>
          <div v-if="cover == ''" class="mdl-textfield mdl-js-textfield">
            <span class="input-label">Cover Image</span>
            <input type="file" v-on:change="readFile" id="file">
          </div>
          <img v-else v-bind:src="cover" alt="" v-on:click="cover = ''">
          <div class="mdl-textfield mdl-js-textfield">
            <span class="input-label">From</span>
            <input class="mdl-textfield__input" type="date" v-model="from" id="from">
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <span class="input-label">To</span>
            <input class="mdl-textfield__input" type="date" v-model="to" id="to">
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <span class="input-label">Price per week (in sek)</span>
            <input class="mdl-textfield__input" type="number" v-model="price" id="price">
          </div>
          <div class="mdl-textfield mdl-js-textfield">
            <span class="input-label">Meeting location</span>
            <input class="mdl-textfield__input" type="text" v-model="meetingLocation" id="location">
          </div>
        </form>
        <div class="button">
          <button v-on:click="postAnnounce" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            Post
          </button>
        </div>
      </div>
      <errorBox 
        v-bind:active="this.state.error"
        v-bind:message="this.state.message"
      ></errorBox>
    </div>
  </div>
</template>

<script>
  import _ from 'underscore';
  import firebase from 'firebase';
  import errorBox from './error-box.vue';

  export default {
    created: function() {
      this.fromDate.setHours(1, 0, 0);
      this.fromDate.setMilliseconds(0);
      this.toDate.setDate(this.toDate.getDate() + 7)
    },
    components: {
      errorBox
    },
    methods: {
      error: function(message) {
        this.state.error = true;
        this.state.message = message;
        setTimeout(_.bind(() => {
          this.state.error = false;
        }, this), 3000);
      },
      readFile: function(e) {
        var files = e.target.files || e.dataTransfer.files;
        console.log(files)
        if (!files.length)
          return;
        if (files && files[0]) {
          var FR = new FileReader();
          FR.onload = _.bind(function(e) {
            this.cover = e.target.result;
          }, this); 
          FR.readAsDataURL(files[0]);
        }
      },
      postAnnounce: function() {
        const db = firebase.firestore();
        db.collection('announces').add({
          author: firebase.auth().currentUser.email,
          cover: this.cover,
          created_at: new Date(),
          description: this.description,
          from: this.fromDate,
          meetingLocation: this.meetingLocation,
          price: this.price,
          title: this.title,
          to: this.toDate,
        })
        .then(_.bind(function() {
          console.log('message sent')
          this.$router.go(-1);
        }, this))
        .catch(function(error) {
          console.error(error)
        })
      }
    },
    computed: {
      from: {
        set: function(newValue) {

          if (new Date(newValue) > this.toDate || new Date(newValue) < this.fromDate) {
            this.error('The "from" date must be included between today and the "to" date');
            this.from = this.fromDate.toISOString().split('T')[0];
            return;
          }
          this.fromDate = new Date(newValue);
        },
        get: function() {
          return this.fromDate.toISOString().split('T')[0];
        }
      },
      to: {
        set: function(newValue) {
          this.toDate.setHours(1, 0, 0);
          this.toDate.setMilliseconds(0);
          if (new Date(newValue) < this.fromDate) {
            this.error('The "to" date must be after the "from" date');
            this.to = this.toDate.toISOString().split('T')[0];
            return;
          }
          this.toDate = new Date(newValue);
        },
        get: function() {
          return this.toDate.toISOString().split('T')[0];
        }
      }
    },
    data: () => {
      return {
        state: {
          error: false,
          success: false,
          message: ''
        },
        title: '',
        description: '',
        fromDate: new Date(),
        cover: '',
        toDate: new Date(),
        price: '',
        meetingLocation: '',

      }
    }
  }
</script>
