<script setup>
import { reactive } from 'vue';
import TagList from '../components/TagList.vue';
import AddTagForm from '../components/AddTagForm.vue';
import axios from '../http_client.js';

const state = reactive({
  tags: []
});

const onSubmit = () => {
};

axios.get('/Tags')
  .then(docs => {
    state.tags = docs.data;
   });
</script>
<template>
  <div>
    <h2>タグ</h2>
    <add-tag-form @submit="onSubmit"></add-tag-form>
    <tag-list :tags="state.tags"></tag-list>
  </div>
</template>

