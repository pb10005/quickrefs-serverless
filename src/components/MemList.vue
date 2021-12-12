<script setup>
import { reactive } from "vue";
import RefCard from "./RefCard.vue";

const state = reactive({
  list: [
    {name: 'a', links: ['https://www.google.com', 'https://www.youtube.com']},
    {name: 'b', links: []},
    {name: 'c', links: []}
  ]
});

</script>
<template>
  <div>
    <ul>
      <li v-for="item in state.list" :key="item">
        <RefCard :name="item.name" :links="item.links" />
      </li>
    </ul>
  </div>
</template>

