<template>
  <div id="chat">
    <div id="content">
      <ul id="messages" class="demo-list-three mdl-list">
        <message
          v-for="message in messages"
          v-bind:username="message.username"
          v-bind:email="message.email"
          v-bind:message="message.message"
          v-bind:id="message.id"
        ></message>
      </ul>
      <form action="#">
        <div class="mdl-textfield mdl-js-textfield">
          <textarea v-model="input" class="mdl-textfield__input" type="text" rows= "3" id="sample5" ></textarea>
          <label class="mdl-textfield__label" for="sample5">Text lines...</label>
        </div>
      </form>
      <button v-on:click="postMessage()" class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
        Send
      </button>
    </div>
  </div>
</template>

<script>
  import _ from 'underscore';
  import back from './back.vue';
  import message from './message.vue';
  import firebase from 'firebase';

  export default {
    updated: function() {
      this.scrollDown();
    },
    created: function() {
      let db = firebase.firestore();
      
      this.snapshot = db.collection("messages").orderBy('posted_at')
        .onSnapshot(_.bind(function(querySnapshot) {
          this.messages = [];
          let messagesGlobal = this.messages;
          querySnapshot.forEach(function(doc) {
            messagesGlobal.push({...doc.data(), id: doc.id});
          });
        }, this));
    },
    destroyed: function() {
      console.log('destroyed')
      this.snapshot();
    },
    methods: {
      scrollDown: function() {
        var container = this.$el.querySelector("#messages");
        container.scrollTop = container.scrollHeight;
      },
      postMessage: function() {
        let db = firebase.firestore();
        let currentUser = firebase.auth().currentUser;
        db.collection('messages').add({
          message: this.input,
          username: currentUser.displayName,
          email: currentUser.email,
          posted_at: new Date()
        })
        .then(function() {
          console.log('message sent')
        })
        .catch(function(error) {
          console.error(error)
        })
        this.input = '';
      }
    },
    components: {
      message,
      back
    },
    data: function() {
      return {
        input: '',
        messages: [],
        snapshot: null
      }
    }
  }
</script>
