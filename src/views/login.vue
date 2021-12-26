<script setup>
import { reactive } from "vue";
import axios from "../http_client.js";

const state = reactive({
 id: "",
 password: ""
});

const login = () => {
  axios.post("/auth/login", {
    name: state.id,
    password: state.password
  }).then(doc => {
    localStorage.setItem("sessionId", doc.data);
  });
};
</script>

<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login" class="pure-form">
      <input type="text" placeholder="Id" v-model="state.id"><br>
      <input type="password" placeholder="password" v-model="state.password"><br>
      <input type="submit" class="pure-button pure-button-primary" value="ログイン">
    </form>
  </div>
</template>

<style scoped>


</style>

