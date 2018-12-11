<template>
  <li class="mdl-list__item mdl-list__item--three-line">
      <span class="mdl-list__item-primary-content">
        <span class="mdl-chip mdl-chip--contact">
            <span class="mdl-chip__contact mdl-color--indigo mdl-color-text--white">B</span>
            <span class="mdl-chip__text">{{username}}</span>
        </span>
        <span class="actions" v-if="isAuthor()">
          <span class="mdl-list__item-secondary-content">
            <a v-on:click="editMessage" class="mdl-list__item-secondary-action" href="#"><i class="material-icons">edit</i></a>
          </span>
          <span class="mdl-list__item-secondary-content">
            <a v-on:click="removeMessage" class="mdl-list__item-secondary-action" href="#"><i class="material-icons">delete</i></a>
          </span>
        </span>
        <div>
          <span v-if="!editMode" class="mdl-list__item-text-body">
            {{message}}
          </span>
          <div v-if="editMode">
            <input class="mdl-textfield__input" type="text" id="sample1" v-model="value">
            <a v-on:click="validateEdition" class="mdl-list__item-secondary-action" href="#"><i class="material-icons">check</i></a>
          </div>

        </div>
      </span>
  </li>
</template>

<script>
  import firebase,{ functions } from 'firebase';

  export default {
    props: [
      'username',
      'email',
      'message',
      'id'
    ],
    methods: {
      validateEdition: function() {
        let db = firebase.firestore();
        let newMessage = this.value;

        db.collection('messages').doc(this.id).update({
          message: newMessage
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        this.editMode = false;
      },
      editMessage: function() {
        this.value = this.message;
        if (!this.editMode) {
          this.editMode = true;
        } else {
          this.editMode = false;
        }
      },
      removeMessage: function() {
        let db = firebase.firestore();
        db.collection('messages').doc(this.id).delete().then(function() {
          console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        });
      },
      isAuthor: function() {
        let currentUser = firebase.auth().currentUser;
        return this.email == currentUser.email;
      }
    },
    data: function() {
      return {
        editMode: false,
        value: this.message
      }
    }
  }
</script>
