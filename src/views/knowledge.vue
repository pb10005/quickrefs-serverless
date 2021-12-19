<script setup>
import { reactive } from "vue";
import { useRoute } from 'vue-router'
import axios from "../http_client.js";
import ReferenceList from "../components/ReferenceList.vue";
import AddReferenceForm from "../components/AddReferenceForm.vue";

const route = useRoute();
const state = reactive({
  name: "",
  description: "",
  list: []
});

axios.get(`/knowledges/${route.params.id}`)
  .then(doc => {
    state.name = doc.data.name;
    state.description = doc.data.description;
    return axios.get(`/references/findbyknowledge/${route.params.id}`);
  })
  .then(doc => {
    state.list = doc.data;
  });

</script>

<template>
  <div>
    {{state.name}}
  </div>
  <div>
    {{state.description}}
  </div>
  <add-reference-form></add-reference-form>
  <p>リファレンス</p>
  <reference-list :referenceList="state.list"></reference-list>
</template>

<style scoped>


</style>
