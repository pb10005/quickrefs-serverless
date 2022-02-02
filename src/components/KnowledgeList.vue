<script setup>

defineProps({
  knowledgeList: []
});

</script>
<template>
    <div class="pure-u-sm-1-3 pure-u-md-1-4" v-for="item in knowledgeList" :key="item">
      <div class="panel">
        <div class="panel-header">
          <strong>{{item.name}}</strong>
        </div>
        <div class="panel-body">
          <small>{{item.description}}</small>
        </div>
        <div class="panel-footer">
          <router-link class="button-small pure-button" :to="`/knowledge/view/${item.id}`">詳細</router-link>
        </div>
      </div>
    </div>
</template>
<style scoped>
.panel {
  background: #f0f0f0;
  margin: 5px 5px 0 5px;
  padding: 5px;
  border-radius: 3px;
}
.panel-header {
  padding: 5px 0;
}
.panel-body {
  padding: 10px 5px;
  white-space: pre-wrap;
  min-height: 30px;
}
</style>
