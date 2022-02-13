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
    <div class="col-span-6 sm:col-span-3 md:col-span-2 m-1" v-for="item in knowledgeList" :key="item">
      <div class="bg-secondary w-full h-full p-2">
        <div class="text-headline font-bold">
          {{item.name}}
        </div>
        <div class="text-paragraph text-sm">
          <small>最終更新日: {{displayDateTime(item.updatedAt)}}</small>
        </div>
        <div class="text-paragraph">
          <small>{{item.description}}</small>
        </div>
        <div class="my-1">
          <router-link class="bg-accent rounded-md text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out" :to="`/knowledge/view/${item.id}`">詳細</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.panel-body {
  white-space: pre-wrap;
}
</style>
