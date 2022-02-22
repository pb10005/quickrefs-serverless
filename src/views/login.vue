<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
import { supabase } from "../supabase"

const loading = ref(false)
const email = ref("")
const password = ref("")
const router = useRouter()

const handleLogin = async () => {
    try {
      loading.value = true
      const { error } = await supabase.auth.signIn({ email: email.value, password: password.value })
      if (error) throw error
      router.push("/profile")
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
        <p class="text-paragraph">メールアドレスとパスワードを入力してログインしましょう</p>
        <div class="my-2">
          <input
            class="w-full h-10 px-4 outline-none"
            type="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="my-2">
          <input
            class="w-full h-10 px-4 outline-none"
            type="password"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <div>
          <input
            type="submit"
            class="bg-accent rounded-md px-4 py-2"
            :value="loading ? '読み込み中' : 'ログイン'"
            :disabled="loading"
          />
        </div>
      </div>
    </form>
  </div>
</div>
</template>
