<script setup>
import { reactive } from 'vue';
import {
  XIcon
} from '@heroicons/vue/solid'

const props = defineProps({
  isOwner: Boolean,
  tags: Array
});

const emit = defineEmits(['onTagDeleteButtonPressed']);
</script>
<template>
  <div>
    <span class="inline-flex bg-tertiary mr-2 mb-1 rounded-lg px-3 py-2" v-for="tag in props.tags" :key="tag"> 
      <div class="mr-1">
        <router-link :to='`/?tag=${tag.id}`'>{{tag.name}}</router-link>
      </div>
      <div class="inline-flex items-center justify-center">
        <button v-if="props.isOwner" @click="emit('onTagDeleteButtonPressed', tag.id)" class=""><XIcon  class="-mr-1 h-5 w-5" aria-hidden="true" /></button>
      </div>
    </span>
  </div>
</template>
<style scoped>
</style>

