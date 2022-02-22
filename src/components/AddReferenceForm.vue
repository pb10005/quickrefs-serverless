<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { insertRef } from '../supabase-client';

const route = useRoute();

const emit = defineEmits();

const state = reactive({
 name: "",
 description: "",
 url: ""
});

const sendData = async () => {
  await insertRef({
    knowledgeId: route.params.id,
    name: state.name,
    description: state.description,
    url: url
  })
  state.name = "";
  state.description = "";
  state.url = "";
  emit("submit")
};
</script>
<template>
  <form @submit.prevent="sendData" class="bg-tertiary py-3 px-2">
    <fieldset>
      <p class="font-bold">リファレンスを新規作成</p>
      <div class="pure-control-group">
        <p>表示名</p>
        <input id="name" type="text" v-model="state.name" placeholder="表示名" class="w-full h-10 px-4 outline-none" required>
      </div>
      <div class="pure-control-group">
        <label for="description">説明</label>
        <textarea type="text" class="w-full h-40 px-4 outline-none" placeholder="説明" v-model="state.description"></textarea>
      </div>
      <div class="pure-control-group">
        <label for="url">URL</label>
        <input id="url" type="text" class="w-full h-10 px-4 outline-none" placeholder="URL" v-model="state.url">
      </div>
      <div class="mt-2">
        <button class="bg-accent rounded-md text-sm px-3 py-2 cursor-pointer">追加</button>
      </div>
    </fieldset>
  </form>
</template>

