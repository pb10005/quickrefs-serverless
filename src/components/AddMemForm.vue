<script setup>
import { reactive } from "vue";
const emit = defineEmits(['success']);
const state = reactive({
 name: ""
});
const onClick = () => {
  emit("success", state.name);
};
</script>
<template>
  <input type="text" v-model="state.name">
  <button @click="onClick">Add</button>
</template>

