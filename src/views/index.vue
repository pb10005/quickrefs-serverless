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

const clearSelection = () => {
  state.selectedTag = null;
  state.knowledges = [];
};

onMounted(() => {
  state.isLoggedIn = localStorage.getItem("sessionId") ? true : false;
  fetchTags();
});
</script>
<template>
  <div>
  <div class="bg-base rounded-lg mt-2 p-2">
    <div class="mt-2">
      <not-logged-in-card v-if="!state.isLoggedIn"/>
    </div>
    <div class="">
      <h3 class="font-bold text-headline">ナレッジをタグで検索する</h3>
      <p class="text-paragraph">タグをクリックしてナレッジを探しましょう</p>
      <p v-if="state.selectedTag"  class="mb-2">
        <span class="text-paragraph text-sm">選択中のタグ: {{ state.selectedTag.name }}</span>
        <button class="bg-accent rounded-lg text-sm cursor-pointer px-3 py-2 ml-2" @click="clearSelection">選択をクリア</button>
      </p>
      <tag-list v-if="!state.selectedTag" :tags="state.tags" @onTagSelected="onTagSelected"></tag-list>
      <knowledge-list :knowledgeList="state.knowledges"></knowledge-list>
    </div>
  </div>
  </div>
</template>
<style scoped>
.clear-button {
  margin-left: 5px;
}
</style>
