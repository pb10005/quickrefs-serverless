<script setup>
import { ref } from "vue"
import { supabase } from "../supabase"

const loading = ref(false)
const email = ref("")

const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signIn({ email: email.value })
      if (error) throw error
      alert("Magic Linkを記載したメールを送信しました。メールボックスを確認してください。")
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {
      loading.value = false
    }
}
</script>
<template>
<div>
  <div class="my-2 p-2 bg-tertiary rounded-lg">
    <form @submit.prevent="handleLogin">
      <div class="">
        <h1 class="text-headline font-bold text-lg">ログイン</h1>
        <p class="text-paragraph">Magic Linkを使ってログインしましょう</p>
        <div class="my-2">
          <input
            class="w-full h-10 px-4 outline-none"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div>
          <input
            type="submit"
            class="bg-accent rounded-md px-4 py-2"
            :value="loading ? '読み込み中' : 'Magic Linkを送信する'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</div>
</template>
