<script setup>
import KnowledgeList from "../components/KnowledgeList.vue";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";
import axios from "../http_client.js";
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
      <not-logged-in-card v-if="!state.isLoggedIn"/>
    </div>
    <div class="pure-u-1">
      <h3>ナレッジ</h3>
      <div class="pure-u-1">
        <router-link class="pure-button" to="/knowledge/add">ナレッジを新規作成</router-link>
      </div>
      <knowledge-list :knowledgeList="state.list"/>
    </div>
  </div>
</template>

<style scoped>


</style>

