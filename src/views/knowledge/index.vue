<script setup>
import { onMounted, ref, reactive } from "vue";
import { useRoute } from 'vue-router'
import ReferenceList from "../../components/ReferenceList.vue";
import AddReferenceForm from "../../components/AddReferenceForm.vue";
import AddKnowledgeTagForm from "../../components/AddKnowledgeTagForm.vue";
import KnowledgeTagList from "../../components/KnowledgeTagList.vue";
import EditKnowledgeForm from "../../components/EditKnowledgeForm.vue";
import ErrorCard from "../../components/ErrorCard.vue";
import {
  CheckIcon,
  ChevronDownIcon,
  LinkIcon,
  UserIcon,
  CalendarIcon,
  PencilIcon,
} from '@heroicons/vue/solid'

import { getProfileById, getKnowledgeById, getKnowledgeTags, getRefsByKnowledgeId, deleteKnowledgeTag } from '../../supabase-client';
import { store } from "../../store";

const route = useRoute();
const state = reactive({
  name: "",
  isEditMode: false,
  description: "",
  isPrivate: false,
  createdAt: null,
  updatedAt: null,
  list: [],
  tags: [],
  owner: "",
  isAddTagFormVisible: false,
  isAddReferenceFormVisible: false,
  isOwner: false
});

const errMsg = ref("");

const fetchKnowledges = async () => {
  const knowledge = await getKnowledgeById(route.params.id)
  state.name = knowledge.data.name
  state.description = knowledge.data.description
  state.isPrivate = knowledge.data.isPrivate
  state.createdAt = knowledge.data.createdAt
  state.updatedAt = knowledge.data.updatedAt

  const profile = await getProfileById(knowledge.data.owner);
  state.ownerId = profile.data.id
  state.owner = profile.data.screenName
  state.isOwner = state.ownerId === store.user.id

  const tags = await getKnowledgeTags(route.params.id)
  state.tags = tags.data

  const refs = await getRefsByKnowledgeId(route.params.id)
  state.list = refs.data
};

const onSubmit = () => {
  fetchKnowledges();
  state.isAddReferenceFormVisible = false;
  state.isAddTagFormVisible = false;
};

const deleteTag = async (tagId) => {
  await deleteKnowledgeTag(route.params.id, tagId)
  await onSubmit()
};

onMounted(async () => {
  await fetchKnowledges();
});
</script>

<template>
  <div>
    <error-card v-if="errMsg" :message="errMsg"/>
    <div v-else>
      <edit-knowledge-form :id="route.params.id" :knowledge="{name:state.name,description:state.description,isPrivate:state.isPrivate}" v-show="state.isEditMode" @cancel="state.isEditMode = false" @submit="() => {fetchKnowledges(); state.isEditMode=false;}"></edit-knowledge-form>
      <div v-show="!state.isEditMode">
        <div class="bg-secondary mt-2 px-3 py-4 rounded-lg lg:flex lg:items-center lg:justify-between">
          <div class="flex-1 min-w-0">
            <h2 class="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate mb-2">{{state.name}}</h2>
            <p class="mb-3 leading-relaxed">
              {{state.description}}
            </p>
            <div class="mb-3">
              <knowledge-tag-list :isOwner="state.isOwner" :tags="state.tags" @onTagDeleteButtonPressed="deleteTag"></knowledge-tag-list>
            </div>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <CalendarIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                最終更新日 {{new Date(state.updatedAt).toLocaleString()}}
              </div>
            </div>
            <div class="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-6">
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <UserIcon class="-ml-1 mr-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                所有者:<span>{{state.owner}}</span>
              </div>
            </div>
            <div class="mt-5 flex">
              <span class="block">
                <button v-if="state.isOwner" type="button" @click="state.isEditMode = true" class="inline-flex items-center bg-accent px-4 py-2 rounded-lg text-sm hover:bg-gray-50 focus:outline-none">
                  <PencilIcon class="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                  編集
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-base px-2 py-4 rounded-lg my-2">
      <p class="font-bold text-lg mb-2">リファレンス</p>
      <div class="mb-2">
        <a v-if="state.isOwner" class="bg-accent rounded-lg text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 mr-2" @click="state.isAddTagFormVisible ^= true">タグを追加</a>
        <a v-if="state.isOwner" class="bg-accent rounded-lg text-sm text-center px-3 py-2 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-600 mr-2" @click="state.isAddReferenceFormVisible ^= true">リファレンスを追加</a>
      </div>
      <add-knowledge-tag-form v-show="state.isAddTagFormVisible"  @submit="onSubmit"></add-knowledge-tag-form>
      <add-reference-form @submit="onSubmit" v-show="state.isAddReferenceFormVisible"></add-reference-form>
      
        <reference-list :isOwner="state.isOwner" :referenceList="state.list" @submit="onSubmit"></reference-list>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button-small {
  font-size: 80%;
}
.container {
  padding: 5px;
  
}

</style>
