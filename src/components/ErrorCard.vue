<script setup>

defineProps({
    message: {
        type: String,
        default: ""
    }    
});

</script>
<template>
    <div class="error-card">
      <p>エラー: {{ message }}</p>
    </div>
</template>
<style scoped>
.error-card {
  padding: 10px;
  background: #ff7878;
  color: white;
  border-radius: 5px;
}
</style>
