<script setup>
import { reactive } from "vue";
import EditReferenceForm from "./EditReferenceForm.vue";
import { deleteRef } from '../supabase-client';

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
    deleteRef(id)
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
      <div class="col-span-6 sm:col-span-3 md:col-span-2 m-1" v-for="item in referenceList" :key="item">
        <div v-show="!state.isEditMode" class="bg-secondary w-full h-full p-2">
          <div class="text-headline font-bold">
            {{item.name}}
          </div>
          <div class="panel-body text-paragraph mb-1">
            <p class="text-sm">最終更新日 {{ new Date(item.updatedAt).toLocaleString() }}</p>
            <p class="text-sm" v-if="item.description">{{item.description}}</p>
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
.panel-body {
  white-space: pre-wrap;
}
</style>
