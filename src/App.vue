<script setup>
</script>

<template>
  <div class="pure-menu pure-menu-horizontal">
  <div class="pure-menu-list">
    <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link">Home</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/knowledge/list" class="pure-menu-link">ナレッジ</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/profile" class="pure-menu-link">プロフィール</router-link>
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
    <div class="pure-g">
      <div class="background pure-u-md-1-6">&nbsp;</div>
      <div class="pure-u-md-2-3 pure-u-sm-1 ">
        <router-view class="main"/>
      </div>
      <div class="background pure-u-md-1-6">&nbsp;</div>
    </div>
  </div>
  <footer>
    これはサンドボックス環境です。すべてのデータは予告なく削除される可能性があります。
  </footer>
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
.main {
  padding: 10px;
  min-height: 100vh;
}
.background {
  background-color: #f0f0f0;
}
</style>
