<script setup>
import { ref, onMounted, reactive } from "vue";
const state = reactive({
  accessToken: null,
  loading: true
})
onMounted(() => {
  if (document.cookie) {
    state.accessToken = document.cookie.split('=')[1];
  }
  state.loading = false;
})
</script>

<template>
  <div v-if="!state.loading">
    <a href="/recommend" class="button" v-if="state.accessToken">Recommend a Song</a>
    <a href="/auth/login" class="button" v-else>Login</a>
  </div>
</template>