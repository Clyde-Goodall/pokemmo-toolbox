
<template>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/statcalc">Calculator</RouterLink>
      <RouterLink to="/berrytimer">Berry Timer</RouterLink>
    </nav>
    <main class="router-view-container">
      <RouterView />
    </main>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.router-view-container {
  margin: 0rem 1rem;
}
</style>

