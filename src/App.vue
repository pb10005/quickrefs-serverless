<script setup>
</script>

<template>
  <div class="bg-base pure-menu pure-menu-horizontal">
  <div class="pure-menu-list">
    <li class="pure-menu-item text-headline logo">
      <strong>QuickRefs</strong>
    </li>
    <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link text-headline">Home</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/knowledge/list" class="pure-menu-link text-headline">ナレッジ</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/profile" class="pure-menu-link text-headline">プロフィール</router-link>
    </li>
    <li class="pure-menu-item">
        <router-link to="/login" class="pure-menu-link text-headline">ログイン</router-link>
    </li>
  </div>
  </div>
  <div class="bg-secondary"> 
    <div class="pure-g">
      <div class="pure-u-md-1-6">&nbsp;</div>
      <div class="pure-u-md-2-3 pure-u-1 ">
        <router-view class="main"/>
      </div>
      <div class="pure-u-md-1-6">&nbsp;</div>
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
  color: #333;
}
.button-small {
  font-size: 80%;
}
.main {
  padding: 10px;
  min-height: 100vh;
}
.logo {
  padding: 0 10px;
}
.text-headline {
  color: #272343;
}
.text-paragraph {
  color: #2d334a;
}
.text-card-heading {
  color: #272343;
}
.text-card-paragraph {
  color: #2d334a;
}
.bg-base {
  background-color: #fffffe;
}
.bg-card {
  background-color: #fffffe;
}
.bg-secondary {
  background-color: #e3f6f5;
}
.bg-tertiary {
  background-color: #bae8e8;
}
.bg-accent {
  background-color: #ffd803;
}
.pure-button {
  background-color: #ffd803;
  color: #272343;
}
</style>
