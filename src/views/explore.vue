<script setup>
import ReferenceList from "../components/ReferenceList.vue";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";
import { ref, reactive } from "@vue/reactivity";
import { textSearchKnowledges } from '../supabase-client';
import { onMounted } from "vue";
import { store } from '../store';

const state = reactive({
  list: []
});

const searchWord = ref('')

onMounted(async () => {
});

const search = async () => {
  const { data } = await textSearchKnowledges(searchWord.value);
  state.list = data;
};

</script>
<template>
  <div>
    <div class="bg-base mt-2 rounded-lg p-2">
      <not-logged-in-card v-if="!store.user"/>
      <h3 class="text-headline font-bold text-lg">リファレンスを検索</h3>
      <div class="">
        <form @submit.prevent="search">
          <input required v-model="searchWord" class="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
          <button>検索</button>
        </form>
        <reference-list :referenceList="state.list"/>
      </div>
    </div>
  </div>
</template>

<style scoped>


</style>

