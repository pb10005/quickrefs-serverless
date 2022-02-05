<script setup>
import KnowledgeList from "../../components/KnowledgeList.vue";
import NotLoggedInCard from "../../components/NotLoggedInCard.vue";
import axios from "../../http_client.js";
import { reactive } from "@vue/reactivity";

const state = reactive({
  isLogginIn: false,
  list: []
});

const onSuccess = (msg) => {
  alert(msg);
};

state.isLoggedIn = localStorage.getItem("sessionId") ? true : false;
axios.get(`/knowledges`)
  .then(doc => {
    state.list = doc.data;
  });
</script>

<template>
  <div class="pure-g">
    <div class="pure-u-1">
      <h2 class="text-headline">公開されたナレッジ</h2>
      <not-logged-in-card v-if="!state.isLoggedIn"/>
      <router-link v-else class="button-small pure-button bg-main text-white" to="/knowledge/add">ナレッジを新規作成</router-link>
    </div>
    <div class="pure-u-1">
      <knowledge-list :knowledgeList="state.list"/>
    </div>
  </div>
</template>

<style scoped>


</style>

