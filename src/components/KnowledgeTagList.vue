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
    <span class="tag bg-tertiary" v-for="tag in props.tags" :key="tag"> 
      <div class="tag-box">
        {{tag.name}}
      </div>
      <div class="tag-delete">
        <button v-if="props.isOwner" @click="emit('onTagDeleteButtonPressed', tag.id)" class="bg-base delete-button">×</button>
      </div>
    </span>
  </div>
</template>
<style scoped>
.tag {
  margin: 10px 5px;
  display: inline-block;
  height: fit-content;
  border-radius: 5px;
}
.tag-box {
  display: inline-block;
  padding: 10px 15px;
}
.tag-delete {
  display: inline-block;
}
.delete-button {
  font-weight: 700;
  cursor: pointer;
  background-color: transparent;
  border-width: 0;
}
</style>

