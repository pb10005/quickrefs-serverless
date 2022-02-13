<script setup>
import KnowledgeList from "../../components/KnowledgeList.vue";
import NotLoggedInCard from "../../components/NotLoggedInCard.vue";
import axios from "../../http_client.js";
import { reactive } from "@vue/reactivity";

const state = reactive({
  list: []
});

state.isLoggedIn = localStorage.getItem("sessionId") ? true : false;
axios.get(`/knowledges`)
  .then(doc => {
    state.list = doc.data;
  });
</script>

<template>
  <div class="">
    <div class="bg-base mt-2 rounded-lg p-2">
      <not-logged-in-card v-if="!state.isLoggedIn"/>
      <h3 class="text-headline font-bold text-lg">公開されたナレッジ</h3>
      <div class="">
        <knowledge-list :knowledgeList="state.list"/>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>

