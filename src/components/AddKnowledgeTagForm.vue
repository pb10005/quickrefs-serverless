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
  axios.get(`/Tags/findbyname/${state.name}`)
    .then(doc => {
      axios.post("/KnowledgeTags", { knowledgeId: route.params.id, tagName: state.name}).then(() => {
        state.name = "";
        emit("submit");
      });
    }).catch(err => {console.log(err.message);});
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

