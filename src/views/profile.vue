<script setup>
import { reactive } from "vue";
import axios from "../http_client.js";
import NotLoggedInCard from "../components/NotLoggedInCard.vue";

const state = reactive({
  isLoggedIn: false,
  profile: {
    screenName: ""
  }
});
const sessionId = localStorage.getItem("sessionId");
axios.get("/users/profile", { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
  .then(doc => {
    if(!doc.data) return;
    state.profile = doc.data;
    state.isLoggedIn = true;
  });
</script>
<template>
  <h2>プロフィール</h2>
  <not-logged-in-card v-if="!state.isLoggedIn"></not-logged-in-card>
  <p>{{state.profile.screenName}}</p>
</template>

