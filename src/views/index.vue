<script setup>
import { onMounted, reactive } from 'vue';
import TagList from '../components/TagList.vue';
import AddTagForm from '../components/AddTagForm.vue';
import KnowledgeList from '../components/KnowledgeList.vue';
import axios from '../http_client.js';

const state = reactive({
  tags: [],
  knowledges: [],
  isCreateTagFormVisible: false
});

const fetchTags = () => {
  axios.get('/Tags')
    .then(docs => {
      state.tags = docs.data;
    });
};

const onSubmit = () => {
  fetchTags();
};

const onTagSelected = (tagId) => {
  const sessionId = localStorage.getItem("sessionId");
  axios.get(`/KnowledgeTags/findByTag/${tagId}`, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
    .then(docs => {
      state.knowledges = docs.data;
    });
};

onMounted(() => {
  fetchTags();
});
</script>
<template>
  <div>
    <router-link class="button-small pure-button pure-button-primary" to="/knowledge/add">ナレッジを新規作成する</router-link>
    <a class="button-small pure-button pure-button-primary" @click="state.isCreateTagFormVisible ^= true">タグを登録する</a>
    <h3>タグで検索する</h3>
    <add-tag-form v-if="state.isCreateTagFormVisible  " @submit="onSubmit"></add-tag-form>
    <tag-list :tags="state.tags" @onTagSelected="onTagSelected"></tag-list>
    <knowledge-list :knowledgeList="state.knowledges"></knowledge-list>
  </div>
</template>
