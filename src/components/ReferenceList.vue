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
        <div class="panel-body"></div>
        <div class="panel-footer">
          <a target="blank" :href="item.url">Link</a>
        </div>
      </li>
    </ul>
  </div>
</template>

