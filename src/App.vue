<script setup>
</script>

<template>
  <div class="pure-menu pure-menu-horizontal">
  <div class="pure-menu-list">
    <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link">Home</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/profile" class="pure-menu-link">プロフィール</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/tag" class="pure-menu-link">タグ</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/login" class="pure-menu-link">ログイン</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/signup" class="pure-menu-link">登録</router-link>
    </li>
  </div>
  </div>
  <div class="container"> 
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.container {
  padding: 5px;
}
.button-small {
  font-size: 80%;
}
</style>
