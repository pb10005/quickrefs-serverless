<script setup>
import KnowledgeList from "../components/KnowledgeList.vue";
import AddMemForm from "../components/AddMemForm.vue";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";


const onSuccess = (msg) => {
  alert(msg);
};
</script>

<template>
  <div>
    <h1>Quick Refs</h1>
    <not-logged-in-card />
    <AddMemForm @success="onSuccess" />
    <knowledge-list />
  </div>
</template>

<style scoped>


</style>

