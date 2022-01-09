<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../http_client.js";

const router = useRouter();
const state = reactive({
 name: "",
 description: "",
 isPrivate: false
});
const sendData = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.post("/Knowledges", {
    name: state.name,
    description: state.description,
    isPrivate: state.isPrivate
  }, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}}).then(() => router.push("/knowledge/list"));
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
      <textarea id="description" type="text" v-model="state.description"></textarea>
    </div>
    <div class="pure-controls">
      <button class="pure-button pure-button-primary">作成</button>
    </div>
    </fieldset>
  </form>
</template>


