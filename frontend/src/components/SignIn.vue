<template>
  <div class="login-page">
    <img alt="BC Paint Co. Logo" src="../assets/logo.png">
    <h1>{{ greeting }}</h1>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <form @submit.prevent="signin">
      <label>Username:</label>
      <input type="text" v-model="username" required><br>
      <label>Password:</label>
      <input type="password" v-model="password" required><br>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script>
import {BACKEND_ADDR} from "@/const";

export default {
  name: 'SignIn',
  data() {
    return {
      greeting: 'BC Paint Co. Internal Portal!',
      username: '',
      password: '',
      errorMessage: '',
      successMessage: ''
    };
  },
  methods: {
    signin() {
      this.clearMessages();
      // POST request to backend
      fetch(`${BACKEND_ADDR}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        }, credentials: "include",
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      })
        .then(response => {
          if (response.ok) {
            this.successMessage = 'Successfully signed in!';
            this.$router.push('/inventory')
          } else {
            this.errorMessage = 'Invalid username or password. Please try again.';
          }
        })
        .catch(error => {
          console.error('Error:', error);
          this.errorMessage = 'An error occurred while signing in. Please try again.';
        });
    },
    clearMessages() {
      this.errorMessage = '';
      this.successMessage = '';
    }
  }
};
</script>

<style scoped>
.error-message, .success-message {
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.error-message {
  background-color: #FFCCCC;
  color: #FF0000;
}

.success-message {
  background-color: #CCFFCC;
  color: #008000;
}
</style>
