<script setup>
import { reactive } from "vue";
import axios from "../http_client.js";
import EditReferenceForm from "./EditReferenceForm.vue";

const state = reactive({
  selectedReference: null,
  isEditMode: false
});

const emit = defineEmits();
defineProps({
  isOwner: false,
  referenceList: []
});

const editItem = (reference) => {
  state.reference = reference;
  state.isEditMode = true;
};

const deleteItem = ({ id }) => {
  const sessionId = localStorage.getItem("sessionId");
  axios.delete(`/references/${id}`, { headers: { sessionId: `quickrefs:sessionId:${sessionId}`}})
    .then(emit("submit"));
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
      <div class="pure-u-sm-1-3 pure-u-md-1-4" v-for="item in referenceList" :key="item">
        <div v-show="!state.isEditMode" class="panel">
          <div class="panel-header">
            <strong>{{item.name}}</strong>
          </div>
          <div class="panel-body">
            <small v-if="item.description">{{item.description}}</small>
          </div>
          <div class="panel-footer">
            <a v-if="item.url" class="button-small pure-button" target="_blank" :href="item.url">表示</a>
            <button v-if="isOwner" @click="editItem(item)" class="button-small pure-button">編集</button>
            <button v-if="isOwner" @click="deleteItem(item)" class="button-small pure-button">削除</button>
          </div>
        </div>
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
