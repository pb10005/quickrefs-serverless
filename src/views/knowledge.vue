<script setup>
import { reactive } from "vue";
import { useRoute } from 'vue-router'
import axios from "../http_client.js";
import ReferenceList from "../components/ReferenceList.vue";
import AddReferenceForm from "../components/AddReferenceForm.vue";
import AddKnowledgeTagForm from "../components/AddKnowledgeTagForm.vue";
import TagList from "../components/TagList.vue";

const route = useRoute();
const state = reactive({
  name: "",
  description: "",
  list: [],
  tags: []
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

fetchKnowledges();
</script>

<template>
  <h2>
    {{state.name}}
  </h2>
  <p>
    {{state.description}}
  </p>
  <h3>タグ</h3>
  <add-knowledge-tag-form></add-knowledge-tag-form>
  <tag-list :tags="state.tags"></tag-list>
  <h3>リファレンス</h3>
  <add-reference-form @submit="fetchKnowledges"></add-reference-form>
  <reference-list :referenceList="state.list"></reference-list>
</template>

<style scoped>


</style>
