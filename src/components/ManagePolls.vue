<template>
  <div>
    <button v-on:click="show">Show Polls</button>
    <table class="table full-width">
      <thead>
        <tr>
          <th>Poll Number</th>
          <th>Question</th>
          <th>Answers and Counts</th>
        </tr>
      </thead>
        <tbody v-if="this.showPolls" >
          <tr v-for="poll in this.polls">
            <td>{{poll.id}}</td>
            <td>{{poll.data.question}}</td>
            <td>
              <table class="table">
                <tr v-for="answer in poll.data.answers">
                  <td class="nested-table">{{answer.answer}}</td>
                  <td class="nested-table">{{answer.count}}</td>
                </tr>
              </table>
            </td>
          </tr>
        </tbody>
    </table>
    <!-- <div class="columns" v-for="(poll, index) in this.polls">
        <div v-bind:key="poll.id" class="column">{{poll.id}}</div>
        <div v-bind:key="index" class="column">{{poll.data.question}}</div>
        <div v-bind:key="index" class="column">
          <div v-for="(answer, index2) in poll.answers">
            <div>ddd{{answer.answer}}</div>
            <div>-{{answer.count}}</div>
          </div>
      </div>
    </div> -->
    <div class="enter-poll">
    <h3>To create a new poll, enter a question and carot(^) delimited potential answers</h3>
    <h3 v-if="this.pollNumber">Your new poll number is {{this.pollNumber}}, note it for future use</h3>
      <input v-model="question" type="text" placeholder="Question"><br>
      <input v-model="answers" type="answers" placeholder="answers"><br>
      <button v-on:click="submit" >Submit your new poll</button>
    </div>
    <button v-on:click="logout">Log Out</button>
  </div>
</template>

<script>
import firebase from 'firebase'
import db from './firebaseInit.js'

export default {
  name: 'ManagePolls',
  data () {
    return {
      polls: [],
      question: '',
      answers: '',
      pollNumber: '',
      showPolls: false
    }
  },
  methods: {
    show: function() {
      this.showPolls = !this.showPolls
    },
    logout: function() {
      firebase.auth().signOut()
      .then(() => {
        this.$router.replace('login')
      })
    },
    submit: function() {
      let answersArray=[]
      this.answers.split('^').forEach(function(element, index){
        answersArray[index] = {answer: element, count: 0}
      })
      db.collection("Polls").add({
        question: this.question,
        answers: answersArray,
        createdUser: firebase.auth().currentUser.email
      })
      .then((docRef)=> {
        this.pollNumber = docRef.id
          console.log("Document written with ID, which you can use to access your poll later in a widget: ", docRef.id);
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
          alert('got an error bud, sry: ' + error)
      });
    }
  },
  created() {
    db.collection('Polls')
    .where('createdUser', '==', firebase.auth().currentUser.email) // insert request user number here
    .get()
    .then((querySnapshot) => {
      let count = 0;
      querySnapshot.forEach((doc) =>{
        this.polls[count] = {id: doc.id, data: doc.data()}
        count++
        })
    });
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.table th {
  text-align: center;
}
/* .table td {
  border-right: 2px solid black;
} */

td {
  text-align: center;
}

.nested-table {
  width: 50%;
}

button {
  margin: 5px;
  padding: 10px 20px;
  background: red;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 22px;
  outline: 0;
  cursor: pointer;
}

.enter-poll {
    margin-top: 10px;
  }
input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}
</style>
