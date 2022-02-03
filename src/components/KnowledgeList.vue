<script setup>
const displayDateTime = (dateTime) => {
  const s = new Date(dateTime);

  return s.toLocaleString();
};

defineProps({
  knowledgeList: []
});

</script>
<template>
    <div class="pure-u-sm-1-2 pure-u-lg-1-3 pure-u-xl-1-4" v-for="item in knowledgeList" :key="item">
      <div class="panel bg-base">
        <div class="panel-header">
          <strong>{{item.name}}</strong>
        </div>
        <div>
          <small>最終更新日: {{displayDateTime(item.updatedAt)}}</small>
        </div>
        <div class="panel-body">
          <small>{{item.description}}</small>
        </div>
        <div class="panel-footer">
          <router-link class="button-small pure-button bg-main text-white" :to="`/knowledge/view/${item.id}`">詳細</router-link>
        </div>
      </div>
    </div>
</template>
<style scoped>
.panel {
  margin: 5px 5px 0 5px;
  padding: 5px;
  border-radius: 3px;
  background-color: #ffffff;
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
