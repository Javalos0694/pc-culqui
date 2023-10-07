<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <ul class="nav">
        <li class="nav-item">
          <router-link class="nav-link text-light" to="/"
            >Save Card</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link text-light" to="/card"
            >Get Card</router-link
          >
        </li>
      </ul>
    </nav>
    <div class="container mt-3 text-white bg-dark rounded w-75">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "App",
});
</script>

