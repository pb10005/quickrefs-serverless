<script setup>
import { onMounted, reactive } from "vue";
import axios from "../http_client.js";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";
import KnowledgeList from "../components/KnowledgeList.vue";
import EditProfileForm from "../components/EditProfileForm.vue";
import {
  CalendarIcon,
  PencilIcon
} from '@heroicons/vue/solid'

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
    <div class="mt-2" v-if="!state.isLoggedIn">
      <not-logged-in-card></not-logged-in-card>
    </div>
    <div v-else class="mt-2">
        <div class="bg-tertiary px-3 py-4 rounded-lg lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">
            <div v-show="state.isEditProfileMode">
              <edit-profile-form :profile="state.profile" @submit="editProfile" @cancel="state.isEditProfileMode = false"></edit-profile-form>
            </div>
            <div v-show="!state.isEditProfileMode">
              <h2 class="text-2xl font-bold leading-7 text-headline sm:text-2xl sm:truncate mb-2">{{state.profile.screenName}}</h2>
              <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
                <div class="mt-2 flex items-center text-sm">
                  <CalendarIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  作成日 {{new Date(state.profile.createdAt).toLocaleString()}}
                </div>
              </div>
              <div class="mt-5 flex">
                <span class="block">
                  <button type="button" @click="state.isEditProfileMode = true" class="inline-flex items-center bg-accent px-4 py-2 rounded-lg text-sm hover:bg-gray-50 focus:outline-none">
                    <PencilIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    編集
                  </button>
                </span>
              </div>
            </div>
          </div>
      </div>
        <div class="bg-base mt-2 rounded-lg p-2">
          <h3 class="text-headline font-bold text-lg mb-2">あなたのナレッジ</h3>
          <div class="mb-3">
            <router-link class="bg-accent rounded-md text-sm text-center px-4 py-2 transition duration-300 ease-in-out hover:bg-blue-600" to="/knowledge/add">ナレッジを新規作成</router-link>
          </div>
          <knowledge-list :knowledgeList="state.userKnowledges"></knowledge-list>
        </div>
    </div>
  </div>

</template>

