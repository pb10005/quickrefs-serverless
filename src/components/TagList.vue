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
      <div class="tag-box bg-tertiary" @click="emit('onTagSelected', tag.id)">{{tag.name}}</div>
    </div>
  </div>
</template>
<style scoped>
.tag {
  margin: 10px 5px;
  display: inline-block;
  height: fit-content;
}
.tag-box {
  display: inline-block;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}
</style>

