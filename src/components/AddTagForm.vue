<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "../http_client.js";

const route = useRoute();

const emit = defineEmits();

const state = reactive({
 name: "",
});

const sendData = () => {
  axios.post("/Tags", {name : state.name}).then(() => emit("submit"));
};
</script>
<template>
  <form @submit.prevent="sendData" class="pure-form pure-form-aligned">
    <fieldset>
      <legend>タグを新規作成</legend>
      <div class="pure-control-group">
        <label for="name">タグ名</label>
        <input id="name" type="text" v-model="state.name" required>
      </div>
      <div class="pure-controls">
        <button class="pure-button pure-button-primary">作成</button>
      </div>
    </fieldset>
  </form>
</template>

