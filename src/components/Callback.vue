<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
let code = ref(null);
onMounted(() => {
  const url = new URL(window.location.href);
  let char = url.search[0];
  code.value = url.search.replace(char, "&");
  localStorage.setItem("oauthToken", code.value);
  window.location.replace("/auth/token");
});
</script>

<template></template>