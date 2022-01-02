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
    <ul>
      <li v-for="tag in props.tags" :key="tag" @click="emit('onTagSelected', tag.id)">{{tag.name}}</li>
    </ul>
  </div>
</template>

