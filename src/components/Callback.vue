<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
let code = ref(null);
onMounted(() => {
  const url = new URL(window.location.href);
  code.value = url.toString().split("=")[1];
  localStorage.setItem('oauthToken', code.value);
  window.location.replace('/')
});
</script>

<template>
</template>