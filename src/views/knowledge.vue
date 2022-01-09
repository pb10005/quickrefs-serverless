<script setup>
import { onMounted, reactive } from "vue";
import { useRoute } from 'vue-router'
import axios from "../http_client.js";
import ReferenceList from "../components/ReferenceList.vue";
import AddReferenceForm from "../components/AddReferenceForm.vue";
import AddKnowledgeTagForm from "../components/AddKnowledgeTagForm.vue";
import TagList from "../components/TagList.vue";
import EditKnowledgeForm from "../components/EditKnowledgeForm.vue";

const route = useRoute();
const state = reactive({
  name: "",
  isEditMode: false,
  description: "",
  list: [],
  tags: [],
  isAddTagFormVisible: false,
  isAddReferenceFormVisible: false
});

const fetchKnowledges = () => {
  axios.get(`/knowledges/${route.params.id}`)
          .then(doc => {
            state.name = doc.data.name;
            state.description = doc.data.description;
            return axios.get(`/references/findbyknowledge/${route.params.id}`);
          })
          .then(doc => {
            state.list = doc.data;
            return axios.get(`/knowledgeTags/findbyknowledge/${route.params.id}`)
          })
          .then(doc => {
            state.tags = doc.data;
          });
};

const onSubmit = () => {
  fetchKnowledges();
};

onMounted(() => {
  fetchKnowledges();
});
</script>

<template>
  <div v-show="!state.isEditMode">
    <h2>
      {{state.name}}
    </h2>
    <p>
      {{state.description}}
    </p>
    <a class="button-small pure-button pure-button-primary" @click="state.isEditMode = true">編集</a>
  </div>
  <edit-knowledge-form :id="route.params.id" v-show="state.isEditMode" @cancel="state.isEditMode = false" @submit="() => {fetchKnowledges(); state.isEditMode=false;}"></edit-knowledge-form>
  <div class="container">
    <tag-list :tags="state.tags"></tag-list>
  </div>
  <a class="button-small pure-button pure-button-primary" @click="state.isAddTagFormVisible ^= true">タグを追加する</a>
  <a class="button-small pure-button pure-button-primary" @click="state.isAddReferenceFormVisible ^= true">リファレンスを追加する</a>
  <add-knowledge-tag-form v-show="state.isAddTagFormVisible"  @submit="fetchKnowledges"></add-knowledge-tag-form>
  <add-reference-form @submit="fetchKnowledges" v-show="state.isAddReferenceFormVisible"></add-reference-form>
  <div class="container">
    <reference-list :referenceList="state.list"></reference-list>
  </div>
</template>

<style scoped>
.button-small {
  font-size: 80%;
}
.container {
  padding: 5px;
}

</style>
