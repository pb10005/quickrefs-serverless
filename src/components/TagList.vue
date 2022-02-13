<script setup>
import { reactive } from 'vue';
import axios from '../http_client.js';

const props = defineProps({
  tags: []
});

const emit = defineEmits(['onTagSelected']);

</script>
<template>
  <div>
    <div class="inline-flex" v-for="tag in props.tags" :key="tag"> 
      <div class="mx-1 mb-1 px-3 py-2 rounded-lg cursor-pointer bg-tertiary" @click="emit('onTagSelected', tag.id)">{{tag.name}}</div>
    </div>
  </div>
</template>
<style scoped>
</style>

