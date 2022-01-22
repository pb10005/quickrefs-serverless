<script setup>
import { reactive, defineProps, defineEmits } from "vue";
import EditReferenceForm from "./EditReferenceForm.vue";

const state = reactive({
  selectedReference: null,
  isEditMode: false
});

const emit = defineEmits();
defineProps({
 referenceList: []
});

const editItem = (reference) => {
  state.reference = reference;
  state.isEditMode = true;
};

const onSubmit = () => {
  state.isEditMode = false;
  emit("submit");
};

</script>
<template>
  <div class="">
    <div class="">
      <edit-reference-form :reference="state.reference" @submit="onSubmit" @cancel="state.isEditMode = false" v-show="state.isEditMode"/>
      <div v-show="!state.isEditMode" class="panel pure-u-sm-1-3 pure-u-md-1-4" v-for="item in referenceList" :key="item">
        <div class="panel-header">
          <span>{{item.name}}</span>
        </div>
        <div class="panel-body">
          <small v-if="item.description">{{item.description}}</small>
        </div>
        <div class="panel-footer">
          <a v-if="item.url" class="button-small pure-button" target="_blank" :href="item.url">表示</a>
          <button @click="editItem(item)" class="button-small pure-button">編集</button>
        </div>
      </div>
    </div>
  </div>
</template>

