<script setup>
import { defineProps } from "vue";

defineProps({
  knowledgeList: []
});

</script>
<template>
    <div class="pure-u-sm-1-3 pure-u-md-1-4" v-for="item in knowledgeList" :key="item">
      <div class="panel">
        <div class="panel-header">
          <p>{{item.name}}</p>
        </div>
        <div class="panel-body">
          {{item.description}}
        </div>
        <div class="panel-footer">
          <router-link class="pure-button" :to="`/knowledge/view/${item.id}`">詳細</router-link>
        </div>
      </div>
    </div>
</template>
<style scoped>
.panel {
  padding: 5px;
}
</style>
