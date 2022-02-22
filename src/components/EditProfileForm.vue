<script setup>
import { onMounted, reactive, watch } from "vue";

const state = reactive({
  profile: {
    name: "",
    screenName: ""
  }
});

const emit = defineEmits(["submit", "cancel"]);

const props = defineProps({
    profile: {
        type: Object,
        default: {
          name: "",
          screenName : ""
        }
    }
});

onMounted(() => {
  state.profile.name = props.profile.name  
  state.profile.screenName = props.profile.screenName
});

watch(props, (_, curr) => {
  state.profile = curr.profile
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
    <form @submit.prevent="submit" class="bg-tertiary">
      <fieldset>
        <p class="text-lg font-bold">プロフィールを編集する</p>
        <div class="pure-control-group">
          <label for="screen-name">ユーザ名</label>
          <input id="screen-name" type="text" class="w-full h-10 px-4 outline-none"  placeholder="ユーザ名" v-model="state.profile.name" required><br>
        </div>
        <div class="pure-control-group">
          <label for="screen-name">表示名</label>
          <input id="screen-name" type="text" class="w-full h-10 px-4 outline-none"  placeholder="表示名" v-model="state.profile.screenName" required><br>
        </div>
        <div class="mt-2">
          <button @click.prevent="cancel" class="bg-base rounded-md text-sm px-3 py-2 mr-2 cursor-pointer">キャンセル</button>
          <button class="bg-accent rounded-md text-sm px-3 py-2 cursor-pointer">登録</button>
        </div>
      </fieldset>
    </form>
  </div>
</template>

<style scoped>


</style>

