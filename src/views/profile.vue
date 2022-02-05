<script setup>
import { onMounted, reactive } from "vue";
import axios from "../http_client.js";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";
import KnowledgeList from "../components/KnowledgeList.vue";
import EditProfileForm from "../components/EditProfileForm.vue";

const state = reactive({
  isLoggedIn: false,
  isEditProfileMode: false,
  profile: {
    id: "",
    screenName: ""
  },
  userKnowledges: []
});

const sessionId = localStorage.getItem("sessionId");

const fetchData = () => {
  axios.get("/users/profile", { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
    .then(doc => {
      if(!doc.data) return;
      state.profile = doc.data;
      state.isLoggedIn = true;
      return axios.get(`/UserKnowledges/findByUser/${state.profile.id}`)
    })
    .then(docs => {
      state.userKnowledges = docs.data;
    });
};

onMounted(() => {
  fetchData();
});

const editProfile = (profile) => {
  axios.put(`/users/${state.profile.id}`, 
    profile,
    { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
  .then(() => {
    state.isEditProfileMode = false;
    fetchData();
  });
};
</script>
<template>
  <div>
    <h2 class="text-headline">プロフィール</h2>
    <not-logged-in-card v-if="!state.isLoggedIn"></not-logged-in-card>
    <div v-else>
      <div v-show="state.isEditProfileMode">
        <edit-profile-form :profile="state.profile" @submit="editProfile" @cancel="state.isEditProfileMode = false"></edit-profile-form>
      </div>
      <div v-show="!state.isEditProfileMode">
        <p>{{state.profile.screenName}}</p>
        <a class="button-small pure-button" @click="state.isEditProfileMode = true">編集</a>
      </div>
      <h3 class="text-headline">あなたのナレッジ</h3>
      <div>
        <router-link class="button-small pure-button" to="/knowledge/add">ナレッジを新規作成</router-link>
      </div>
      <knowledge-list :knowledgeList="state.userKnowledges"></knowledge-list>
    </div>
  </div>
</template>

