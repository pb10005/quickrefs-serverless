<script setup>
import { onMounted, reactive, defineEmits, defineProps } from "vue";
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
    <form @submit.prevent="signup" class="pure-form pure-form-aligned">
      <fieldset>
        <legend>プロフィールを編集する</legend>
        <div class="pure-control-group">
          <label for="screen-name">表示名</label>
          <input id="screen-name" type="text" placeholder="Screen Name" v-model="state.profile.screenName" required><br>
        </div>
        <div class="pure-controls">
          <button @click.prevent="cancel" class="pure-button">キャンセル</button>
          <button @click.prevent="submit" class="pure-button pure-button-primary">登録</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>


</style>

