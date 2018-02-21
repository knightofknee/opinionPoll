<template>
<div>
  <h1>hiya partner</h1>
  <h2>Question: {{this.question}}</h2>
  <h3>
    <div v-for="answer in this.answers">
      <h5>{{answer.answer}}</h5>
      <h5 v-if="showCount">{{answer.count}}</h5>
    </div>
  </h3>
  <button v-on:click="show">Show results</button>

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
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) =>{
          this.question = doc.data().question
          this.answers = doc.data().answers
          })
      });
    },
    methods: {
      show: function() {
        this.showCount = !this.showCount
      }
    }
}
</script>

<style scoped>

</style>

