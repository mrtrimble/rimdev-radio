<script setup>
import { onMounted } from "@vue/runtime-core";

const props = defineProps({
  clientId: String,
  clientSecret: String,
});

const base64 = btoa(props.clientId + ":" + props.clientSecret);
let oauthToken = localStorage.getItem("oauthToken");

const endpoint = new URL("https://accounts.spotify.com/api/token");

const authOptions = {
  url: "https://accounts.spotify.com/api/token",
  // formData: {
  // },
  // redirect_uri: "http://localhost:3000/auth/callback",
  body: `grant_type=authorization_code&${oauthToken}&redirect_uri=http://localhost:3000/auth/callback`,
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
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
    })
    .then(() => {
      window.location.replace('/');
    });
})
</script>

<template></template>