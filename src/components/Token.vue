<script setup>
const props = defineProps({
  clientId: String,
  clientSecret: String,
});

const oauthCode = localStorage.getItem("oauthCode");
const endpoint = new URL("https://accounts.spotify.com/api/token");

await fetch(endpoint.href, {
  method: "POST",
  form: {
    code: oauthCode,
    redirect_uri: "http://localhost:3000/auth/callback",
    grant_type: "authorization_code",
  },
  headers: {
    Authorization: `Basic ${btoa(props.clientId + ":" + props.clientSecret)}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  json: true,
})
  .then((response) => response.json())
  .then((data) => console.log(data));
</script>

<template></template>