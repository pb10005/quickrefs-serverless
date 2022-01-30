<script setup>
import { reactive, defineProps, defineEmits } from 'vue';
import axios from '../http_client.js';

const props = defineProps({
  isOwner: Boolean,
  tags: Array
});

const emit = defineEmits(['onTagDeleteButtonPressed']);
</script>
<template>
  <div>
    <span class="tag" v-for="tag in props.tags" :key="tag"> 
      <span class="tag-box">
        {{tag.name}}
      </span>
      <button v-if="props.isOwner" @click="emit('onTagDeleteButtonPressed', tag.id)" class="delete-button">×</button>
    </span>
  </div>
</template>
<style scoped>
.tag {
  margin: 10px 5px;
  background-color: #f0f0f0;
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
  cursor: pointer;
  border-radius: 50%;
  border-width: 0;
}
</style>

