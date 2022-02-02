<script setup>
import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "../http_client.js";

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
 name: "",
 description: "",
 url: ""
});

watch(() => props.reference, (to, from) => {
    state.name = to.name;
    state.description = to.description;
    state.url = to.url;
});

const cancel = () => {
    emit("cancel");
};

const sendData = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.put(`/References/${props.reference.id}`, {
    name: state.name,
    description: state.description,
    url: state.url
  }, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
  .then(() => {
    state.name = "";
    state.description = "";
    state.url = "";
    emit("submit");
  });
};
</script>
<template>
  <form class="pure-form pure-form-aligned">
    <fieldset>
      <legend>リファレンスを編集</legend>
      <div class="pure-control-group">
        <label for="name">表示名</label>
        <input id="name" type="text" v-model="state.name" required>
      </div>
      <div class="pure-control-group">
        <label for="description">説明</label>
        <textarea type="text" v-model="state.description"></textarea>
      </div>
      <div class="pure-control-group">
        <label for="url">URL</label>
        <input id="url" type="text" v-model="state.url">
      </div>
      <div class="pure-controls">
        <button @click.prevent="cancel" class="pure-button">キャンセル</button>
        <button @click.prevent="sendData" class="pure-button bg-main text-white">編集</button>
      </div>
    </fieldset>
  </form>
</template>

