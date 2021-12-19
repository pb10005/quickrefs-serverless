<script setup>
import { reactive } from "vue";

const state = reactive({
 id: "",
 password: ""
});

const login = () => {
  alert(state.password);
};

</script>

<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="login" class="pure-form">
      <input type="text" placeholder="Id" v-model="state.id"><br>
      <input type="password" placeholder="password" v-model="state.password"><br>
      <input type="submit" class="pure-button pure-button-primary" value="登録">
    </form>
  </div>
</template>

<style scoped>


</style>

