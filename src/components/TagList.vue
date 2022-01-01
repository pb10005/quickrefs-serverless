<script setup>
import { reactive, defineProps } from 'vue';
import axios from '../http_client.js';

const props = defineProps({
  tags: []
});

</script>
<template>
  <div>
    <ul>
      <li v-for="tag in props.tags" :key="tag">{{tag.name}}</li>
    </ul>
  </div>
</template>

