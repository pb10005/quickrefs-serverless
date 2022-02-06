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
  <div class="px">
    <div class="">
    <error-card v-if="errMsg" :message="errMsg" />
    <form @submit.prevent="login" class="pure-form pure-form-aligned">
      <fieldset>
        <legend class="text-headline">ログイン</legend>
        <div class="pure-control-group">
          <label for="id">ID</label>
          <input id="id" type="text" placeholder="Id" v-model="state.id">
        </div>
        <div class="pure-control-group">
          <label for="password">パスワード</label>
          <input id="password" type="password" placeholder="password" v-model="state.password">
        </div>
        <div class="pure-controls">
          <input type="submit" class="pure-button bg-main text-white" value="ログイン">
        </div>
      </fieldset>
    </form>
    <p>新規登録は<router-link to="/signup">こちら</router-link></p>
    </div>
  </div>
</template>

<style scoped>
.px {
  padding: 0 5px;
}
</style>

