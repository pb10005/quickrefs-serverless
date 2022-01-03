<script setup>
import { defineProps } from "vue";

defineProps({
 referenceList: []
});

</script>
<template>
  <div class="">
    <div class="">
      <div class="panel pure-u-sm-1-3 pure-u-md-1-4" v-for="item in referenceList" :key="item">
        <div class="panel-header">
          <span>{{item.name}}</span>
        </div>
        <div class="panel-body">
          <small v-if="item.description">{{item.description}}</small>
        </div>
        <div class="panel-footer">
          <a v-if="item.url" class="button-small pure-button" target="_blank" :href="item.url">表示</a>
        </div>
      </div>
    </div>
  </div>
</template>

