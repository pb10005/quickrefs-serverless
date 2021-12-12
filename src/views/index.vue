<script setup>
import MemList from "../components/MemList.vue";
import AddMemForm from "../components/AddMemForm.vue";

const onSuccess = (msg) => {
  alert(msg);
};
</script>

<template>
  <div>
    <h1>Quick Refs</h1>
    <AddMemForm @success="onSuccess" />
    <MemList />
  </div>
</template>

<style scoped>


</style>

