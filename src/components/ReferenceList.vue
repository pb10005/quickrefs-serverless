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
  <div class="grid grid-cols-6">
      <edit-reference-form class="col-span-6" :reference="state.reference" @submit="onSubmit" @cancel="state.isEditMode = false" v-show="state.isEditMode"/>
      <div class="col-span-6 sm:col-span-3 md:col-span-2" v-for="item in referenceList" :key="item">
        <div v-show="!state.isEditMode" class="panel bg-secondary">
          <div class="panel-header text-card-headline">
            <strong>{{item.name}}</strong>
          </div>
          <div class="panel-body text-card-paragraph">
            <small v-if="item.description">{{item.description}}</small>
          </div>
          <div class="panel-footer">
            <a v-if="item.url" class="bg-accent rounded-md text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 mr-2" target="_blank" :href="item.url">表示</a>
            <button v-if="isOwner" @click="editItem(item)" class="bg-accent rounded-md text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 mr-2">編集</button>
            <button v-if="isOwner" @click="deleteItem(item)" class="bg-base rounded-md text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 mr-2">削除</button>
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
