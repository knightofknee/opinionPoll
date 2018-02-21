// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

let app;
// let db;
// let config = {
//   apiKey: "AIzaSyALHfDenen4iDw6qlN_SGlsOTsxAiDMHM4",
//   authDomain: "opinion-poll-widget.firebaseapp.com",
//   // databaseURL: "https://opinion-poll-widget.firebaseio.com",
//   projectId: "opinion-poll-widget",
//   // storageBucket: "",
//   messagingSenderId: "597165547472"
// };
// firebase.initializeApp(config);

// let database = firebase.database()
////////
firebase.auth().onAuthStateChanged(function(user) {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      components: { App },
      template: '<App/>'
    })
  }
})
//////////
// db = firebase.firestore(app)

/* eslint-disable no-new */
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
