<script setup>
import { defineProps, reactive } from "vue";

const props = defineProps({
  name: String,
  links: Array 
});
const state = reactive({
});

</script>
<template>
  <div>
    <p>{{ name }}</p>
    <div v-for="item in links" :key="item">
      <a target="_blank" :href="item">{{ item }}</a>
    </div>  
  </div>
</template>

