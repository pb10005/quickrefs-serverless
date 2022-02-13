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
    errMsg.value = err.response.data;
  });
};

</script>

<template>
  <div>
    <error-card v-if="errMsg" :message="errMsg"></error-card>
    <div class="flex justify-center items-center">
      <form @submit.prevent="signup" class="mt-6">
        <div class="bg-tertiary px-6 py-10 shadow-lg">
          <legend class="text-headline heading text-center font-bold text-2xl mb-3">新規登録</legend>
          <div class="">
            <input id="id" type="text" placeholder="Username" class="title w-full h-12 px-4 outline-none mb-2" v-model="state.id" required>
          </div>
          <div class="">
            <input id="password" type="password" placeholder="Password" class="title w-full h-12 px-4 outline-none mb-2" v-model="state.password" required>
          </div>
          <div class="mb-3">
            <input type="submit" class="bg-accent px-3 py-2 rounded-lg cursor-pointer" value="登録">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>


</style>

