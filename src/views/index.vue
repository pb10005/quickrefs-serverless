<script setup>
import { onMounted, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import TagList from '../components/TagList.vue';
import KnowledgeList from '../components/KnowledgeList.vue';
import NotLoggedInCard from '../components/NotLoggedInCard.vue';

import { getTags, getTagById, getKnowledgesByTag } from '../supabase-client';
import { store } from '../store';

const state = reactive({
  tags: [],
  knowledges: [],
  isCreateTagFormVisible: false,
  selectedTag: null
});

const route = useRoute();
const router = useRouter();

const fetchTags = () => {
  getTags()
    .then(({ data, error }) => {
      state.tags = data
    });
};

const onSubmit = () => {
  fetchTags();
};

const onTagSelected = async (tagId) => {
  router.push(`/?tag=${tagId}`);
  /*
  state.selectedTag = state.tags.find(t => t.id == tagId);
  const res = await getKnowledgesByTag(tagId)
  state.knowledges = res.data
  */
};

const clearSelection = () => {
  state.selectedTag = null;
  state.knowledges = [];
};

onMounted(async () => {
  if(!route.query.tag) {
    fetchTags();
  } else {
    const tagId = route.query.tag;
    state.selectedTag = await getTagById(tagId);
    const res = await getKnowledgesByTag(tagId)
    state.knowledges = res.data
  }
});
</script>
<template>
  <div>
  <div class="bg-base rounded-lg my-2 p-2">
    <div class="mt-2">
      <not-logged-in-card v-if="!store.user"/>
    </div>
    <div class="">
      <h3 class="font-bold text-headline">ナレッジをタグで検索する</h3>
      <p class="text-paragraph">タグをクリックしてナレッジを探しましょう</p>
      <p v-if="state.selectedTag"  class="mb-2">
        <span class="text-paragraph text-sm">選択中のタグ: {{ state.selectedTag.name }}</span>
        <button class="bg-accent rounded-lg text-sm cursor-pointer px-3 py-2 ml-2" @click="router.push('/')">選択をクリア</button>
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
