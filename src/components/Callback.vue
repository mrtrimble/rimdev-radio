<script setup>
import { ref } from "vue";
import { onMounted } from "@vue/runtime-core";
let code = ref(null);
onMounted(() => {
  const url = new URL(window.location.href);
  code.value = url.toString().split("=")[1];
  code.value = code.value.split('&')[0];
  localStorage.setItem('oauthToken', code.value);
  window.location.replace('/auth/token')
});
</script>

<template>
</template>

<!-- BQBN1bYvb_oGebzvvXm82xePM4-CGqzCxe9sarvhDN0c7T1_GzNYcM46V50DhuyNHaidLlOJ937_TTWrA6TwK6FTTK_kWcgyuLciVersClr85Bw1nvtvFSJeBwLLBHfjNzQ5dAPReHRv0fpdnzHW0eeTJdGHd5vp1_5w_zIuWeQjOX9LXqzmpdQ_Ueso1nJzkDsDFEniO-EUaTQ -->
<!-- AQAJyBRhh3LPIodtKnAhmuq3908fGQiJMFh7A_rmy9RxbuifvB69ZjN-4VwgXXA6mxNKr8THHHQc4Z4P_oZPWuZVLVawN_pGbbvyL40CcpH0t7SrvV3JRSkSXVa3492vQidBIlQLClk5FE3Cqv-N9JW38LFoeXs6tmnx9XAlcRxZx6nmAk-ZQjVWE2l2TRVWO4mBVsALaq9KQ5LuYWMTp0AijFj3EdnY-ZS5WnkreeY6s-6w4zZ0mLBnG6mmO8q2eoRzqLJp47nm62VimFI&state -->
