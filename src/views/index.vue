<script setup>
import { reactive } from 'vue';
import TagList from '../components/TagList.vue';
import AddTagForm from '../components/AddTagForm.vue';
import KnowledgeList from '../components/KnowledgeList.vue';
import axios from '../http_client.js';

const state = reactive({
  tags: [],
  knowledges: []
});

const onSubmit = () => {
};

const onTagSelected = (tagId) => {
  axios.get(`/KnowledgeTags/findByTag/${tagId}`)
    .then(docs => {
      state.knowledges = docs.data;
    });
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
    <tag-list :tags="state.tags" @onTagSelected="onTagSelected"></tag-list>
    <knowledge-list :knowledgeList="state.knowledges"></knowledge-list>
  </div>
</template>

