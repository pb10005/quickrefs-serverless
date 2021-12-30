<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "../http_client.js";

const route = useRoute();

const emit = defineEmits();

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
  }).then(() => emit("submit"));
};
</script>
<template>
  <form @submit.prevent="sendData" class="pure-form pure-form-aligned">
    <fieldset>
      <legend>リファレンスを新規作成</legend>
      <div class="pure-control-group">
        <label for="name">表示名</label>
        <input id="name" type="text" v-model="state.name" required>
      </div>
      <div class="pure-control-group">
        <label for="description">説明</label>
        <textarea type="text" v-model="state.description"></textarea>
      </div>
      <div class="pure-control-group">
        <label for="url">URL</label>
        <input id="url" type="text" v-model="state.url">
      </div>
      <div class="pure-controls">
        <button class="pure-button pure-button-primary">Add</button>
      </div>
    </fieldset>
  </form>
</template>

