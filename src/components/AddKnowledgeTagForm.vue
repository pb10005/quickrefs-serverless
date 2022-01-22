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
  <form @submit.prevent="sendData" class="pure-form pure-form-aligned">
    <fieldset>
      <legend>タグを追加</legend>
      <div class="pure-control-group">
        <label for="name">タグ名</label>
        <input id="name" type="text" v-model="state.name" required>
      </div>
      <div class="pure-controls">
        <button class="pure-button pure-button-primary">追加</button>
      </div>
    </fieldset>
  </form>
</template>

