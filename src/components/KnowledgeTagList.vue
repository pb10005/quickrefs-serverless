<script setup>
import { reactive } from 'vue';
import axios from '../http_client.js';

const props = defineProps({
  isOwner: Boolean,
  tags: Array
});

const emit = defineEmits(['onTagDeleteButtonPressed']);
</script>
<template>
  <div>
    <span class="tag bg-secondary text-white" v-for="tag in props.tags" :key="tag"> 
      <span class="tag-box">
        {{tag.name}}
      </span>
      <button v-if="props.isOwner" @click="emit('onTagDeleteButtonPressed', tag.id)" class="bg-base delete-button">×</button>
    </span>
  </div>
</template>
<style scoped>
.tag {
  margin: 10px 5px;
  display: inline-block;
  height: fit-content;
  padding-right: 5px;
  border-radius: 5px;
}
.tag-box {
  display: inline-block;
  padding: 10px 15px;
}
.delete-button {
  font-weight: 700;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  border-width: 0;
}
</style>

