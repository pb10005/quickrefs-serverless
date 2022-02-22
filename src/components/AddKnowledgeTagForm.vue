<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { getTagByName, insertTag, insertKnowledgeTag } from "../supabase-client";

const route = useRoute();

const emit = defineEmits();

const state = reactive({
 name: "",
});

const sendData = async () => {
  const tag = await getTagByName(state.name)
  let id = ""
  if(tag) {
    id = tag.id
  } else {
    const { data } = await insertTag(state.name)
    id = data.id
  }
  insertKnowledgeTag(route.params.id, id)
    .then(() => emit("submit"))
};
</script>
<template>
  <form @submit.prevent="sendData" class="bg-tertiary py-3 px-2">
    <fieldset>
      <p class="font-bold">タグを追加</p>
      <div class="mb-2">
        <p>タグ名</p>
        <input id="name" type="text" class="w-full h-10 px-4 outline-none" placeholder="タグ名" v-model="state.name" required>
      </div>
      <div class="">
        <button class="bg-accent rounded-md text-sm px-3 py-2 cursor-pointer">追加</button>
      </div>
    </fieldset>
  </form>
</template>

