<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "../http_client.js";

const route = useRoute();
const state = reactive({
 name: "",
 description: "",
 url: ""
});
const sendData = () => {
  axios.post("/References", {
    name: state.name,
    description: state.description,
    knowledgeId: route.params.id,
    url: state.url
  });
};
</script>
<template>
  <form @submit.prevent="sendData" class="pure-form">
    <input type="text" v-model="state.name"><br>
    <input type="text" v-model="state.description"><br>
    <input type="text" v-model="state.url"><br>
    <button class="pure-button pure-button-primary">Add</button>
  </form>
</template>

