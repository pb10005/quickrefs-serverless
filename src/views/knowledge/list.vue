<script setup>
import KnowledgeList from "../../components/KnowledgeList.vue";
import NotLoggedInCard from "../../components/NotLoggedInCard.vue";
import { reactive } from "@vue/reactivity";
import { getKnowledges } from '../../supabase-client';
import { onMounted } from "vue";
import { store } from '../../store';

const state = reactive({
  list: []
});

onMounted(async () => {
  const { data } = await getKnowledges();
  state.list = data;
});
</script>
<template>
  <div>
    <div class="bg-base mt-2 rounded-lg p-2">
      <not-logged-in-card v-if="!store.user"/>
      <h3 class="text-headline font-bold text-lg">公開されたナレッジ</h3>
      <div class="">
        <knowledge-list :knowledgeList="state.list"/>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>

