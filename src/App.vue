<script setup>
</script>

<template>
  <div class="bg-base pure-menu pure-menu-horizontal">
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
  <div class="bg-base"> 
    <div class="pure-g">
      <div class="pure-u-md-1-6">&nbsp;</div>
      <div class="pure-u-md-2-3 pure-u-1 ">
        <router-view class="main"/>
      </div>
      <div class="bg-base pure-u-md-1-6">&nbsp;</div>
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
.button-small {
  font-size: 80%;
}
.main {
  padding: 10px;
  min-height: 100vh;
}
.text-white {
  color: #ffffff;
}
.bg-base {
  background-color: #f6f6e9;
}
.bg-main {
  background-color: #005792;
}
.bg-secondary {
  background-color: #13334c;
}
.bg-accent {
  background-color: #fd5f00;
}
.text-main {
  color: #005792;
}
</style>
