<script setup>
import { onMounted, ref } from "vue";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://italxwakbpmnxjmkbptj.supabase.co";
const supabase = createClient(supabaseUrl, props.supabaseKey);
const oauthToken = ref(null);
onMounted(() => {
  oauthToken.value = localStorage.getItem("oauthToken");
})
console.log({oauthToken});

const props = defineProps({
  clientId: String,
  clientSecret: String,
  supabaseKey: String,
  accessToken: String,
  playlistId: String,
});

const teamMember = ref(null);
const search = ref(null);
const options = ref([]);
const option = ref(null);

const handleSearch = () => {
  const endpoint = new URL("https://api.spotify.com/v1/search");
  endpoint.searchParams.append("query", search.value);
  endpoint.searchParams.append("type", "track");
  endpoint.searchParams.append("market", "US");
  if (props.accessToken) searchSpotifyApi(endpoint.href);
};

const searchSpotifyApi = async (url) => {
  options.value = [];
  return await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${props.accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      options.value = [...data.tracks.items];
    })
    .catch((err) => console.log(err));
};

const updateOption = (item) => {
  option.value = { ...item };
};

const handleSubmit = async (event) => {
  event.preventDefault();
  if (!teamMember.value && !option.value && !search.value) return;

  const recommendation = {
    name: teamMember.value,
    track: option.value.name,
    band: option.value.artists[0].name,
    album: option.value.album.name,
    album_link: option.value.album.external_urls.spotify,
    album_art: option.value.album.images[1].url,
    track_link: option.value.external_urls.spotify,
    band_link: option.value.artists[0].external_urls.spotify,
    uri: option.value.uri,
  };

  const endpoint = new URL(
    `https://api.spotify.com/v1/playlists/${props.playlistId}/tracks`
  );
  endpoint.searchParams.append("uris", recommendation.uri);

  await fetch(endpoint.href, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${oauthToken.value}`,
    },
  });

  await supabase
    .from("recommendations")
    .insert([{ ...recommendation }])
    .then(() => handleReset())
    .catch((err) => console.log(err));
};

const handleReset = () => {
  teamMember.value = null;
  search.value = null;
  options.value = [];
};
</script>

<template>
  <form @submit="handleSubmit" @reset="handleReset">
    <section class="user-info">
      <label for="team-member">Team Member Name</label>
      <input
        type="text"
        id="team-member"
        name="team-member"
        required
        aria-required="true"
        v-model="teamMember"
      />
    </section>
    <section class="song-search">
      <label for="song-search">Song Search</label>
      <div class="input-group">
        <input
          required
          aria-required="true"
          type="text"
          id="song-search"
          name="song-search"
          v-model="search"
        />
        <button type="button" @click="handleSearch">
          <svg
            width="32"
            height="32"
            viewBox="0 0 19 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Search Songs</title>
            <path
              d="M8 16C9.77498 15.9996 11.4988 15.4054 12.897 14.312L17.293 18.708L18.707 17.294L14.311 12.898C15.405 11.4997 15.9996 9.77544 16 8C16 3.589 12.411 0 8 0C3.589 0 0 3.589 0 8C0 12.411 3.589 16 8 16ZM8 2C11.309 2 14 4.691 14 8C14 11.309 11.309 14 8 14C4.691 14 2 11.309 2 8C2 4.691 4.691 2 8 2Z"
              fill="snow"
            />
            <path
              d="M9.412 6.58603C9.791 6.96603 10 7.46803 10 8.00003H12C12.0009 7.47445 11.8976 6.95392 11.6961 6.46851C11.4946 5.9831 11.1988 5.54245 10.826 5.17202C9.312 3.66002 6.687 3.66002 5.174 5.17202L6.586 6.58803C7.346 5.83003 8.656 5.83203 9.412 6.58603Z"
              fill="snow"
            />
          </svg>
        </button>
      </div>
      <template v-if="options.length">
        <fieldset>
          <legend>Choose Song</legend>
          <div class="song-options" v-for="option in options" :key="option.id">
            <label :for="option.id" class="song-option">
              <figure>
                <img :src="option.album.images[1].url" :alt="option.album" />
              </figure>
              <dl>
                <dt>{{ option.name }}</dt>
                <dd>{{ option.artists[0].name }}</dd>
                <dd>{{ option.album.name }}</dd>
              </dl>
              <input
                aria-required="true"
                required
                type="radio"
                :id="option.id"
                name="song-options"
                @change="updateOption(option)"
              />
            </label>
          </div>
        </fieldset>
      </template>
    </section>

    <section class="form-actions">
      <button type="submit">Recommend Song</button>
      <button type="reset">Cancel</button>
    </section>
  </form>
</template>