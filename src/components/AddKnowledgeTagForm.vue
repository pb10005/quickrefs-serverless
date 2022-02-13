<script setup>
import { reactive } from "vue";
import { useRoute } from "vue-router";
import axios from "../http_client.js";

const route = useRoute();

const emit = defineEmits();

const state = reactive({
 name: "",
});

const sendData = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.get(`/Tags/findbyname/${state.name}`)
    .then(doc => {
      // すでにタグが存在する場合
      axios.post("/KnowledgeTags", { knowledgeId: route.params.id, tagName: state.name}, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}}).then(() => {
        state.name = "";
        emit("submit");
      });
    }).catch(err => {
      if(err.response.status == 404) {
        axios.post("/Tags", {name : state.name}, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}}).then(() => {
          return axios.post("/KnowledgeTags", { knowledgeId: route.params.id, tagName: state.name}, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
        }).then(() => {
            state.name = "";
            emit("submit");
          });;
      } else {
        alert(err.response.status);
      }
    });
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

