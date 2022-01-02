<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../http_client.js";

const router = useRouter();
const state = reactive({
 id: "",
 password: ""
});

const login = () => {
  axios.post("/auth/login", {
    name: state.id,
    password: state.password
  }).then(doc => {
    localStorage.setItem("sessionId", doc.data);
    router.push("/profile");
  });
};
</script>

<template>
  <div class="px">
    <div class="">
    <form @submit.prevent="login" class="pure-form pure-form-aligned">
      <fieldset>
        <legend>ログイン</legend>
        <div class="pure-control-group">
          <label for="id">Id</label>
          <input id="id" type="text" placeholder="Id" v-model="state.id">
        </div>
        <div class="pure-control-group">
          <label for="password">パスワード</label>
          <input id="password" type="password" placeholder="password" v-model="state.password">
        </div>
        <div class="pure-controls">
          <input type="submit" class="pure-button pure-button-primary" value="ログイン">
        </div>
      </fieldset>
    </form>
    </div>
  </div>
</template>

<style scoped>
.px {
  padding: 0 5px;
}
</style>

