<script setup>
import { defineProps } from "vue";

defineProps({
  knowledgeList: []
});

</script>
<template>
  <div class="">
    <ul class="">
      <li class="panel" v-for="item in knowledgeList" :key="item">
        <div class="panel-header">
          <router-link :to="`/knowledge/${item.id}`">{{item.name}}</router-link>
        </div>
        <div class="panel-body">
          {{item.description}}
        </div>
        <div class="panel-footer">
        </div>
      </li>
    </ul>
  </div>
</template>

