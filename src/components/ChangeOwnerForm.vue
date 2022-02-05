<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "../http_client.js";

const route = useRoute();

const emit = defineEmits();

const state = reactive({
  userId: ""
});

const sendData = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.put(`/UserKnowledges/${state.userId}`, {
    knowledgeId: route.params.id,
  }, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`} })
  .then(() => {
    state.userId = "";
    emit("submit")
  });
};
</script>
<template>
  <form @submit.prevent="sendData" class="pure-form pure-form-aligned">
    <fieldset>
      <legend>所有者を移転</legend>
      <div class="pure-control-group">
        <label for="name">移転先のユーザID</label>
        <input id="name" type="text" v-model="state.userId" required>
      </div>
      <div class="pure-controls">
        <button class="pure-button bg-main text-white">移転</button>
      </div>
    </fieldset>
  </form>
</template>

