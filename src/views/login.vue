<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../http_client.js";
import ErrorCard from "../components/ErrorCard.vue";

const router = useRouter();
const state = reactive({
 id: "",
 password: ""
});
const errMsg = ref("");

const login = () => {
  axios.post("/auth/login", {
    name: state.id,
    password: state.password
  }).then(doc => {
    localStorage.setItem("sessionId", doc.data);
    router.push("/profile");
  }).catch(err => {
    errMsg.value = err.response.data;
  });
};
</script>

<template>
<div class="min-h-screen">
  <error-card v-if="errMsg" :message="errMsg" />
  <div class="flex justify-center items-center">
  <form @submit.prevent="login" class="mt-6">
    <div class="bg-tertiary px-6 py-10 shadow-lg">
      <legend class="text-headline heading text-center font-bold text-2xl mb-3">ログイン</legend>
      <div class="">
        <input id="id" type="text" placeholder="Username" class="title w-full h-12 px-4 outline-none mb-2" v-model="state.id">
      </div>
      <div class="">
        <input id="password" type="password" placeholder="Password" class="title w-full h-12 px-4 outline-none mb-2" v-model="state.password">
      </div>
      <div class="mb-3">
        <input type="submit" class="bg-accent px-3 py-2 rounded-lg cursor-pointer" value="ログイン">
      </div>
      <p>新規登録は<router-link to="/signup">こちら</router-link></p>
    </div>
  </form>
  </div>
</div>
</template>

<style scoped>
.px {
  padding: 0 5px;
}
</style>

