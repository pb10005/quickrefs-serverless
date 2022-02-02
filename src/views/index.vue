<script setup>
import { onMounted, reactive } from 'vue';
import TagList from '../components/TagList.vue';
import AddTagForm from '../components/AddTagForm.vue';
import KnowledgeList from '../components/KnowledgeList.vue';
import NotLoggedInCard from '../components/NotLoggedInCard.vue';
import axios from '../http_client.js';

const state = reactive({
  tags: [],
  isLoggedIn: false,
  knowledges: [],
  isCreateTagFormVisible: false
});

const fetchTags = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.get('/Tags', { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
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
  state.isLoggedIn = localStorage.getItem("sessionId") ? true : false;
  fetchTags();
});
</script>
<template>
  <div class="pure-g">
    <div class="pure-u-1">
      <h2 class="text-main">Quick Refs</h2>
      <not-logged-in-card v-if="!state.isLoggedIn"/>
      <router-link v-else class="button-small pure-button bg-main text-white" to="/knowledge/add">ナレッジを新規作成</router-link>
    </div>
    <div class="pure-u-1">
      <h3>タグで検索する</h3>
      <tag-list :tags="state.tags" @onTagSelected="onTagSelected"></tag-list>
      <knowledge-list :knowledgeList="state.knowledges"></knowledge-list>
    </div>
  </div>
</template>
