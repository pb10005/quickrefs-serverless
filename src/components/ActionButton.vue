<script setup>
import { defineProps, defineEmits } from 'vue';

defineProps({
    label: String,
});

const emits = defineEmits();

const onClick = () => {
    emits("click", null);
};
</script>
<template>
    <button @click="onClick" class="bg-accent rounded-lg text-center px-3 py-2 transition duration-300 ease-in-out hover:bg-base">
        {{ label }} 
    </button>
</template>
