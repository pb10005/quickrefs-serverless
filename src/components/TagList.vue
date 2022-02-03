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
    <div class="tag" v-for="tag in props.tags" :key="tag"> 
      <button class="button-large pure-button bg-secondary text-white" @click="emit('onTagSelected', tag.id)">{{tag.name}}</button>
    </div>
  </div>
</template>
<style scoped>
.tag {
  display: inline-block;
  margin: 10px 5px;
}
</style>

