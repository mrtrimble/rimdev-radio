<script setup>
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  clientId: String,
  clientSecret: String,
  mode: String,
});

const base64 = btoa(props.clientId + ":" + props.clientSecret);
let oauthToken = localStorage.getItem("oauthToken");
const redirectUri = props.mode === 'DEV'
  ? "http://localhost:3000/auth/callback"
  : "https://rimdev-radio.netlify.app/auth/callback";

const endpoint = new URL("https://accounts.spotify.com/api/token");

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  body: `grant_type=authorization_code&${oauthToken}&redirect_uri=${redirectUri}`,
  headers: {
    Authorization: `Basic ${base64}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  json: true,
};

onMounted(() => {
  fetch(endpoint.href, {
    method: "POST",
    ...authOptions,
  })
    .then((response) => response.json())
    .then((data) => {
      const now = new Date();
      let time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);
      document.cookie = `access_token=${
        data.access_token
      }; expires=${now.toUTCString()}; path=/`;
      localStorage.clear();
    })
    .then(() => {
      window.location.replace("/");
    });
});
</script>

<template></template>