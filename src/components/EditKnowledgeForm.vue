<script setup>
import { onMounted, reactive, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { updateKnowledge } from "../supabase-client";

const route = useRoute();
const router = useRouter();
const state = reactive({
 name: "",
 description: "",
 isPrivate: false
});

const props = defineProps({
  id: {
    type: String,
    default: ""
  },
  knowledge: {
    type: Object, 
    default: {
      name: "",
      description: "",
      isPrivate: false
    }
  }
});
const emit = defineEmits(["submit"]);

const cancel = () => {
    emit("cancel");
};

const sendData = () => {
  updateKnowledge(props.id, {
    name: state.name,
    description: state.description,
    isPrivate: state.isPrivate
  })
  .then(() => emit("submit"));
};

onMounted(() => {
  state.name = props.knowledge.name;
  state.description = props.knowledge.description;
  state.isPrivate = props.knowledge.isPrivate;
});

watch(props, (curr, _) => {
  state.name = curr.knowledge.name;
  state.description = curr.knowledge.description;
  state.isPrivate = curr.knowledge.isPrivate;
});

</script>
<template>
  <form @submit.prevent="sendData" class="bg-tertiary mt-2 px-2 py-3">
    <h2 class="text-headline font-bold mb-3 text-lg">ナレッジを編集</h2>
    <div class="mb-2">
      <p>表示名</p>
      <input id="name" type="text" placeholder="表示名" class="w-full h-10 px-4 outline-none" v-model="state.name" required>
    </div>
    <div class="mb-2">
      <p>説明</p>
      <textarea id="description" placeholder="説明" class="w-full h-60 px-4 outline-none" type="text" v-model="state.description"></textarea>
    </div>
    <label class="inline-flex items-center mt-3 mb-3">
        <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="state.isPrivate"><span class="ml-2 text-gray-700">非公開にする</span>
    </label>
    <div class="pure-controls">
      <button @click.prevent="cancel" class="bg-base text-sm rounded-lg px-3 py-2 cursor-pointer mr-2">キャンセル</button>
      <button class="bg-accent text-sm rounded-lg px-3 py-2 cursor-pointer">確定</button>
    </div>
  </form>
</template>


