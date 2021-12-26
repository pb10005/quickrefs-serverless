<script setup>
import { defineProps } from "vue";

defineProps({
 referenceList: []
});

</script>
<template>
  <div class="">
    <ul class="">
      <li class="panel" v-for="item in referenceList" :key="item">
        <div class="panel-header">
          <p>{{item.name}}</p>
        </div>
        <div class="panel-body">
          <p v-if="item.description">{{item.description}}</p>
        </div>
        <div class="panel-footer">
          <a v-if="item.url" class="pure-button" target="blank" :href="item.url">表示</a>
        </div>
      </li>
    </ul>
  </div>
</template>

