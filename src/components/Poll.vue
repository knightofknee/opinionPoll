<template>
<div>
  <h1>hiya partner</h1>
  <h2>Question: {{question}}</h2>
  <h3>
    <div v-for="(answer, index) in answers">
      <button :value="index" v-on:click="show($event)" >{{answer.answer}}</button>
      <h5 v-if="showCount">{{answer.count}}</h5>
    </div>
  </h3>
  <!-- <button v-if="!showCount" v-on:click="show($event)">Submit and reveal results</button> -->
  <!-- change this to be a submit button, updating the count with a method -->

</div>
</template>

<script>
import db from './firebaseInit'
import firebase from 'firebase'

export default {
  name: 'Poll',
    data: function() {
      return {
        question: '',
        answers: [],
        count: null,
        showCount: false
      }
    },
    created() {
      db.collection('Polls')
      .where(firebase.firestore.FieldPath.documentId(), '==', this.$route.params.pollId)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.empty) {alert('It appears you are looking for a poll that does not exist')}
        else {
        querySnapshot.forEach((doc) =>{
          this.question = doc.data().question
          this.answers = doc.data().answers
          })}
      })
      // .catch(err => {alert('It appears you are looking for a poll that does not exist: ' + err)})
    },
    methods: {
      show: function(event) {
        if (event) event.preventDefault()
        this.answers[event.target.value].count++
        this.showCount = !this.showCount
        let pollReference = db.collection('Polls').doc(this.$route.params.pollId).update({
          answers: this.answers
        })
        .then(() => {console.log('success')})
        .catch(console.log)
        // .where(firebase.firestore.FieldPath.documentId(), "==", this.$route.params.pollId)
        // .set()
        // console.log('test', pollReference)
      }
    }
}

      // .get()
      // .then((querySnapshot) => {
</script>

<style scoped>

</style>

