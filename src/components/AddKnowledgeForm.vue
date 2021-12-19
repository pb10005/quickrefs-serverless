<script setup>
import { reactive } from "vue";
import axios from "../http_client.js";
const state = reactive({
 name: "",
 description: "",
 isPrivate: false
});
const sendData = () => {
  axios.post("/Knowledges", {
    name: state.name,
    description: state.description,
    isPrivate: state.isPrivate
  });
};
</script>
<template>
  <form @submit.prevent="sendData" class="pure-form">
    a
    <input type="text" v-model="state.name"><br>
    <input type="text" v-model="state.description"><br>
    <button class="pure-button pure-button-primary">Add</button>
  </form>
</template>


