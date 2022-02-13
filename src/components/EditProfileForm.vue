<script setup>
import { onMounted, reactive } from "vue";
import axios from "../http_client.js";

const state = reactive({
  profile: {
    screenName: ""
  }
});

const emit = defineEmits(["submit", "cancel"]);

const props = defineProps({
    profile: {
        type: Object,
        default: {
            screenName : ""
        }
    }
});

const signup = () => {
  axios.post("/auth/signup", {
    name: state.id,
    password: state.password
  });
};

onMounted(() => {
    state.profile.screenName = props.profile.screenName
});

const submit = () => {
  emit("submit", state.profile)
};

const cancel = () => {
  emit("cancel");
};
</script>

<template>
  <div>
    <form @submit.prevent="signup" class="bg-tertiary">
      <fieldset>
        <p class="text-lg font-bold">プロフィールを編集する</p>
        <div class="pure-control-group">
          <label for="screen-name">表示名</label>
          <input id="screen-name" type="text" class="w-full h-10 px-4 outline-none"  placeholder="表示名" v-model="state.profile.screenName" required><br>
        </div>
        <div class="mt-2">
          <button @click.prevent="cancel" class="bg-base rounded-md text-sm px-3 py-2 mr-2 cursor-pointer">キャンセル</button>
          <button @click.prevent="submit" class="bg-accent rounded-md text-sm px-3 py-2 cursor-pointer">登録</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>


</style>

