<script setup>
import { defineProps } from 'vue';

defineProps({
    to: String,
    label: String,
});

</script>
<template>
    <router-link :to="to" class="bg-accent rounded-lg text-center px-3 py-2 transition duration-300 ease-in-out hover:bg-base">
        {{ label }} 
    </router-link>
</template>
