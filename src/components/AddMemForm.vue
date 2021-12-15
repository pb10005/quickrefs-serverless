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
  <form class="pure-form">
    <input type="text" v-model="state.name">
    <button @click="onClick" class="pure-button pure-button-primary">Add</button>
  </form>
</template>

