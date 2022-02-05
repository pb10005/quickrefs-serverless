<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from 'vue-router'
import axios from "../../http_client.js";
import ReferenceList from "../../components/ReferenceList.vue";
import AddReferenceForm from "../../components/AddReferenceForm.vue";
import AddKnowledgeTagForm from "../../components/AddKnowledgeTagForm.vue";
import KnowledgeTagList from "../../components/KnowledgeTagList.vue";
import EditKnowledgeForm from "../../components/EditKnowledgeForm.vue";
import ErrorCard from "../../components/ErrorCard.vue";
import ChangeOwnerForm from "../../components/ChangeOwnerForm.vue";

const route = useRoute();
const state = reactive({
  name: "",
  isEditMode: false,
  description: "",
  list: [],
  tags: [],
  owners: [],
  isAddTagFormVisible: false,
  isAddReferenceFormVisible: false,
  isChangeOwnerFormVisible: false,
  isOwner: false
});

const errMsg = ref("");

const fetchKnowledges = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.get(`/knowledges/check/${route.params.id}`, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
    .then(doc => {
      if(doc.data === 2)
      {
        state.isOwner = true;
      } else {
        state.isOwner = false;
      }
    });
  axios.get(`/knowledges/${route.params.id}`, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
          .then(doc => {
            state.name = doc.data.name;
            state.description = doc.data.description;
            return axios.get(`/userknowledges/findbyknowledge/${route.params.id}`)
          })
          .then(doc => {
            state.owners = doc.data;
            return axios.get(`/references/findbyknowledge/${route.params.id}`);
          })
          .then(doc => {
            state.list = doc.data;
            return axios.get(`/knowledgeTags/findbyknowledge/${route.params.id}`)
          })
          .then(doc => {
            state.tags = doc.data;
          })
          .catch(err => {
            errMsg.value = err.message;
          });
};

const onSubmit = () => {
  fetchKnowledges();
  state.isAddReferenceFormVisible = false;
  state.isAddTagFormVisible = false;
  state.isChangeOwnerFormVisible = false;
};

const deleteTag = (tagId) => {
  const sessionId = localStorage.getItem("sessionId");
  axios.delete(`/knowledgeTags/${route.params.id}/${tagId}`, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
    .then(onSubmit);
};

onMounted(() => {
  fetchKnowledges();
});
</script>

<template>
  <div>
    <error-card v-if="errMsg" :message="errMsg"/>
    <div v-else>
      <div v-show="!state.isEditMode">
        <h2 class="text-headline">
          {{state.name}}
        </h2>
        <h3 class="text-headline">所有者:<span v-for="user in state.owners" :key="user.id">{{user.screenName}}</span></h3>
        <p class="text-paragraph">
          {{state.description}}
        </p>
        <a v-if="state.isOwner" class="button-small pure-button bg-main text-white" @click="state.isEditMode = true">編集</a>
      </div>
      <edit-knowledge-form :id="route.params.id" v-show="state.isEditMode" @cancel="state.isEditMode = false" @submit="() => {fetchKnowledges(); state.isEditMode=false;}"></edit-knowledge-form>
      <div class="container">
        <knowledge-tag-list :isOwner="state.isOwner" :tags="state.tags" @onTagDeleteButtonPressed="deleteTag"></knowledge-tag-list>
      </div>
      <a v-if="state.isOwner" class="button-small pure-button bg-main text-white" @click="state.isAddTagFormVisible ^= true">タグを追加</a>
      <a v-if="state.isOwner" class="button-small pure-button bg-main text-white" @click="state.isAddReferenceFormVisible ^= true">リファレンスを追加</a>
      <a v-if="state.isOwner" class="button-small pure-button bg-main text-white" @click="state.isChangeOwnerFormVisible ^= true">所有者を移転</a>
      <add-knowledge-tag-form v-show="state.isAddTagFormVisible"  @submit="onSubmit"></add-knowledge-tag-form>
      <add-reference-form @submit="onSubmit" v-show="state.isAddReferenceFormVisible"></add-reference-form>
      <change-owner-form @submit="onSubmit" v-show="state.isChangeOwnerFormVisible"></change-owner-form>
      <div class="container">
        <reference-list :isOwner="state.isOwner" :referenceList="state.list" @submit="onSubmit"></reference-list>
      </div>
    </div>
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
