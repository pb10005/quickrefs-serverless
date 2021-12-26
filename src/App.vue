<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div class="pure-menu pure-menu-horizontal">
  <div class="pure-menu-list">
    <li class="pure-menu-item">
        <a href="/" class="pure-menu-link">Home</a>
    </li>
    <li class="pure-menu-item">
        <router-link to="/profile" class="pure-menu-link">プロフィール</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/signup" class="pure-menu-link">登録</router-link>
    </li>
  </div>
  </div>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
