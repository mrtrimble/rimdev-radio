<script setup>
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  authQueryParameters: String
})

onMounted(() => {
  window.location.replace('https://accounts.spotify.com/authorize/?' + props.authQueryParameters);
})
</script>

<template>
  
</template>