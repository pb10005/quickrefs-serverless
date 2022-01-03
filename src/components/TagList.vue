<script setup>
import { reactive, defineProps, defineEmits } from 'vue';
import axios from '../http_client.js';

const props = defineProps({
  tags: []
});

const emit = defineEmits(['onTagSelected']);

</script>
<template>
  <div>
    <span class="tag" v-for="tag in props.tags" :key="tag"> 
      <button class="button-large pure-button" @click="emit('onTagSelected', tag.id)">{{tag.name}}</button>
    </span>
  </div>
</template>
<style scoped>
.tag {
  margin: 10px 5px;
}
</style>

