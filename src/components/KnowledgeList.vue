<script setup>
import { reactive } from "vue";

import axios from "../http_client.js";

const state = reactive({
  list: []
});

axios.get("/knowledges")
  .then(docs => {
    state.list = docs.data;
  });
</script>
<template>
  <div>
    <ul>
      <li v-for="item in state.list" :key="item">
        <router-link :to="`/knowledge/${item.id}`">{{item.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

