<script setup>
import { reactive } from "vue";
import { useRoute } from 'vue-router'
import axios from "../http_client.js";

const route = useRoute();
const state = reactive({
  name: "",
  description: "",
  list: []
});

axios.get(`/knowledges/${route.params.id}`)
  .then(doc => {
    state.name = doc.data.name;
    state.description = doc.data.description;
    return axios.get(`/references`);
  })
  .then(doc => {
    state.list = doc.data;
  });

</script>

<template>
  <div>
    {{state.name}}
  </div>
  <div>
    {{state.description}}
  </div>
  <ul>
    <li v-for="item in state.list" :key="item">{{item}}</li>
  </ul>
</template>

<style scoped>


</style>
