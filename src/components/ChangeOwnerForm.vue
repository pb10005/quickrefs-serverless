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
  <form @submit.prevent="sendData" class="bg-tertiary py-3 px-2">
    <fieldset>
      <p class="font-bold">所有者を移転</p>
      <div class="pure-control-group">
        <p>移転先のユーザID</p>
        <input id="name" type="text" v-model="state.userId" class="w-full h-10 px-4 outline-none" placeholder="説明" required>
      </div>
      <div class="mt-2">
        <button class="bg-accent rounded-md text-sm px-3 py-2 cursor-pointer">移転</button>
      </div>
    </fieldset>
  </form>
</template>

