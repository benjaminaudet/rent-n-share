<template>
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header" id="nav">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title">{{currentPage}}</span>
                <div class="mdl-layout-spacer"></div>
                <nav class="mdl-navigation"></nav>
            </div>
        </header>
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">Pages</span>
            <nav class="mdl-navigation">
                <router-link v-on:click.native="signOut()" to="/signin" class="mdl-navigation__link mdl-js-ripple-effect">
                    <div class="material-icons">home</div>
                    Sign Out
                </router-link>
                <a v-on:click="deleteAccount()" href="#" class="mdl-navigation__link mdl-js-ripple-effect">
                    <div class="material-icons">delete</div>
                  Delete Account
                </a>
            </nav>
        </div>
    </div>
</template>

<script>
  import _ from 'underscore';
  import firebase from 'firebase';

  export default {
      props: [
          'currentPage'
      ],
      methods: {
        deleteAccount: function() {
          let currentUser = firebase.auth().currentUser;
          let db = firebase.firestore();
          
          firebase.auth().signOut();
          currentUser.delete();

          db.collection('messages').where('email', '==', currentUser.email).get().then(function(querySnapshot) {
            querySnapshot.forEach(doc => {
              db.collection('messages').doc(doc.id).delete().then(function() {
              })
            })
          })
          this.close();
        },
        close: function() {
            document.getElementById('nav').MaterialLayout.toggleDrawer()
        },
        signOut: function() {
          firebase.auth().signOut()
            .then(_.bind(function() {
              console.log('Signed Out !')
              this.close();
            }, this));
        }
      },
      data: function() {
          return {
          }
      }
  }
</script>


