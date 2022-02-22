<script setup>
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { updateRef } from '../supabase-client';

const route = useRoute();

const emit = defineEmits();
const props = defineProps({
  reference: {
      id: "",
      name: "",
      description: "",
      url: ""
  }
});

const state = reactive({
 id: "",
 name: "",
 description: "",
 url: ""
});

watch(() => props.reference, (to,_) => {
    state.id = to.id;
    state.name = to.name;
    state.description = to.description;
    state.url = to.url;
});

const cancel = () => {
    emit("cancel");
};

const sendData = async () => {
  await updateRef(state.id, {
    name: state.name,
    description: state.description,
    url: state.url
  })
  state.name = "";
  state.description = "";
  state.url = "";
  emit("submit");
};
</script>
<template>
  <div class="">
  <form class="bg-tertiary py-3 px-2">
    <fieldset>
      <p class="font-bold">リファレンスを編集</p>
      <div class="pure-control-group">
        <label for="name">表示名</label>
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
        <button @click.prevent="cancel" class="bg-base rounded-md text-sm px-3 py-2 cursor-pointer mr-2">キャンセル</button>
        <button @click.prevent="sendData" class="bg-accent rounded-md text-sm px-3 py-2 cursor-pointer">編集</button>
      </div>
    </fieldset>
  </form>
  </div>
</template>

