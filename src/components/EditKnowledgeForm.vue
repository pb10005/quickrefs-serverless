<script setup>
import { onMounted, reactive, defineProps, defineEmits } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "../http_client.js";

const route = useRoute();
const router = useRouter();
const state = reactive({
 name: "",
 description: "",
 isPrivate: false
});

const props = defineProps(["id"]);
const emit = defineEmits(["submit"]);

const cancel = () => {
    emit("cancel");
};

const sendData = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.put(`/Knowledges/${props.id}`, {
    id: props.id,
    name: state.name,
    description: state.description,
    isPrivate: state.isPrivate
  }, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}}).then(() => emit("submit"));
};

onMounted(() => {
  const sessionId = localStorage.getItem("sessionId");
  axios.get(`/Knowledges/${props.id}`,{ headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
      .then(doc => {
          state.name = doc.data.name;
          state.description = doc.data.description;
          state.isPrivate = doc.data.isPrivate;
      });
});

</script>
<template>
  <form @submit.prevent="sendData" class="pure-form pure-form-aligned">
    <fieldset>
    <legend>ナレッジを編集</legend>
    <div class="pure-control-group">
      <label for="name">表示名</label>
      <input id="name" type="text" v-model="state.name" required>
    </div>
    <div class="pure-control-group">
      <label for="description">説明</label>
      <textarea id="description" type="text" v-model="state.description"></textarea>
    </div>
    <div class="pure-control-group">
      <label for="description">非公開にする</label>
      <input id="description" type="checkbox" v-model="state.isPrivate">
    </div>
    <div class="pure-controls">
      <button @click.prevent="cancel" class="pure-button">キャンセル</button>
      <button class="pure-button pure-button-primary">確定</button>
    </div>
    </fieldset>
  </form>
</template>


