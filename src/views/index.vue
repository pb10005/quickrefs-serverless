<script setup>
import KnowledgeList from "../components/KnowledgeList.vue";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";
import axios from "../http_client.js";
import { reactive } from "@vue/reactivity";

const state = reactive({
  list: []
});

const onSuccess = (msg) => {
  alert(msg);
};

axios.get(`/knowledges`)
  .then(doc => {
    state.list = doc.data;
  });
</script>

<template>
  <div>
    <not-logged-in-card />
    <router-link to="/knowledge/add">ナレッジを新規作成</router-link>
    <p>ナレッジ</p>
    <knowledge-list :knowledgeList="state.list"/>
  </div>
</template>

<style scoped>


</style>

