<script setup>
import { onMounted, reactive } from 'vue';
import TagList from '../components/TagList.vue';
import KnowledgeList from '../components/KnowledgeList.vue';
import NotLoggedInCard from '../components/NotLoggedInCard.vue';
import axios from '../http_client.js';

const state = reactive({
  tags: [],
  isLoggedIn: false,
  knowledges: [],
  isCreateTagFormVisible: false,
  selectedTag: null
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
  state.selectedTag = state.tags.find(t => t.id == tagId);
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
      <not-logged-in-card v-if="!state.isLoggedIn"/>
    </div>
    <div class="pure-u-1">
      <h3 class="text-headline">ナレッジをタグで検索する</h3>
      <p class="text-paragraph">タグをクリックしてナレッジを探しましょう</p>
      <p v-if="state.selectedTag">state.selectedTag.name</p>
      <tag-list :tags="state.tags" @onTagSelected="onTagSelected"></tag-list>
      <knowledge-list :knowledgeList="state.knowledges"></knowledge-list>
    </div>
  </div>
</template>
