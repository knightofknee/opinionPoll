<template>
<div>
  <h1>Pollater 3000 Poll</h1>
  <br>
  <h2>Question: {{question}}</h2>
    <div v-if="!showCount" v-for="(answer, index) in answers">
      <button :value="index" v-on:click="show($event)" >{{answer.answer}}</button>
      <h5 v-if="showCount">{{answer.count}}</h5>
    </div>
    <br>
    <h3 v-if="showCount">Results</h3>
    <br>
    <div v-if="showCount" v-for="(answer, index) in answers">
      <h3 >{{answer.answer}}</h3>
      <h5 v-if="showCount">{{answer.count}}</h5>
    </div>

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
      }
    }
}
</script>

<style scoped>

</style>

