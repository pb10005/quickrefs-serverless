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
  <form @submit.prevent="sendData" class="pure-form pure-form-aligned">
    <fieldset>
    <legend>ナレッジを新規作成</legend>
    <div class="pure-control-group">
      <label for="name">表示名</label>
      <input id="name" type="text" v-model="state.name" required>
    </div>
    <div class="pure-control-group">
      <label for="description">説明</label>
      <input id="description" type="text" v-model="state.description"><br>
    </div>
    <div class="pure-controls">
      <button class="pure-button pure-button-primary">Add</button>
    </div>
    </fieldset>
  </form>
</template>


