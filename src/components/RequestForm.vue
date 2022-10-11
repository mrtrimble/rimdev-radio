<template>
  <form name="request" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="request" />
    <label for="name"> Name </label>
    <input type="text" id="name" name="name" />
    <label for="email"> Email </label>
    <input type="text" id="email" name="email" />
    <section class="form-actions">
      <button type="submit">Request</button>
    </section>
  </form>
</template>