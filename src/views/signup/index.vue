<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../../http_client.js";
import ErrorCard from "../../components/ErrorCard.vue";

const state = reactive({
 id: "",
 password: ""
});

const errMsg = ref("");
const router = useRouter();

const signup = () => {
  axios.post("/auth/signup", {
    name: state.id,
    password: state.password
  }).then(() => {
    router.push("/signup/complete");
  }).catch(err => {
    errMsg.value = err.message;
  });
};

</script>

<template>
  <div>
    <error-card v-if="errMsg" :message="errMsg"></error-card>
    <form @submit.prevent="signup" class="pure-form pure-form-aligned">
      <fieldset>
        <legend>新規登録</legend>
        <div class="pure-control-group">
          <label for="id">ID</label>
          <input id="id" type="text" placeholder="Id" v-model="state.id" required><br>
        </div>
        <div class="pure-control-group">
          <label for="password">パスワード</label>
          <input id="password" type="password" placeholder="password" v-model="state.password" required><br>
        </div>
        <div class="pure-controls">
          <input type="submit" class="pure-button pure-button-primary" value="登録">
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>


</style>

