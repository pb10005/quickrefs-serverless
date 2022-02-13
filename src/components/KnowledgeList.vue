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
  <div class="grid grid-cols-6">
    <div class="col-span-6 sm:col-span-3 md:col-span-2" v-for="item in knowledgeList" :key="item">
      <div class="bg-secondary mx-1 p-2">
        <div class="text-card-heading">
          <strong>{{item.name}}</strong>
        </div>
        <div class="text-paragraph text-sm">
          <small>最終更新日: {{displayDateTime(item.updatedAt)}}</small>
        </div>
        <div class="panel-body text-paragraph">
          <small>{{item.description}}</small>
        </div>
        <div class="">
          <router-link class="bg-accent rounded-md text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 mr-2" :to="`/knowledge/view/${item.id}`">詳細</router-link>
        </div>
      </div>
      </div>
  </div>
</template>
<style scoped>
.panel {
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
