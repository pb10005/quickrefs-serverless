<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import axios from "../http_client.js";

const router = useRouter();
const state = reactive({
 name: "",
 description: "",
 isPrivate: false
});
const sendData = () => {
  const sessionId = localStorage.getItem("sessionId");
  axios.post("/Knowledges", {
    name: state.name,
    description: state.description,
    isPrivate: state.isPrivate
  }, { 
    headers: { sessionId: `quickrefs:sessionId:${sessionId}`}
  })
  .then((doc) => router.push(`/knowledge/view/${doc.data.id}`));
};
</script>
<template>
  <div>
    <div class="bg-tertiary py-3 px-2 mt-2 rounded-lg">
      <form @submit.prevent="sendData" class="">
        <h2 class="text-headline text-center font-bold text-2xl mb-3">ナレッジを新規作成</h2>
        <div class="mb-2">
          <p>表示名</p>
          <input id="name" type="text" placeholder="表示名" class="w-full h-10 px-4 outline-none" v-model="state.name" required>
        </div>
        <div>
          <p>説明</p>
          <textarea id="description" placeholder="説明" class="w-full h-60 px-4 outline-none" type="text" v-model="state.description"></textarea>
        </div>
        
        <label class="inline-flex items-center mt-3 mb-3">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-600" v-model="state.isPrivate"><span class="ml-2 text-gray-700">非公開にする</span>
        </label>
        <div class="pure-controls">
          <button class="bg-accent rounded-md px-4 py-2">作成</button>
        </div>
      </form>
    </div>
  </div>
</template>


