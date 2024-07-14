
<template>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/statcalc">Calculator</RouterLink>
      <RouterLink to="/berrytimer">Berry Timer</RouterLink>
    </nav>
    <main class="router-view-container">
      <RouterView />
    </main>
    <footer>
      Clyde Goodall 2023
    </footer>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
.router-view-container {
  min-height: 100vh;
  margin: 0rem 1rem;
}

footer {
  background: rgba(0,0,0, .03);
  border-top: 1px solid black;
  color: darkgray;
  text-align: center;
  padding: .5rem;
  font-size: 8pt;
}
</style>

