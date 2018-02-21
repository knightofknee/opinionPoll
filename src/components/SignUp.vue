<template>
  <div class="sign-up">
    <h3>Create New Account</h3>
    <input v-model="email" type="text" placeholder="Email"><br>
    <input v-model="password" type="password" placeholder="Password"><br>
    <button v-on:click="signUp">Sign Up</button>
    <span><router-link to="/login"> back to login</router-link></span>
  </div>
</template>

<script>
  import firebase from 'firebase'

  export default {
    name: 'signUp',
    data: function() {
      return {
        email: '',
        password: ''
      }
    },
    methods: {
      signUp: function() {
        firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('hello')})
        .catch(err => {
          console.log(err)
          alert('no account created, error: ' + err.message)})
      }
    }
  }
</script>

<style scoped>
  .sign-up {
    margin-top: 10px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>

