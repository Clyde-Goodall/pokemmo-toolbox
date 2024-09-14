
<template>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/statcalc">Builder</RouterLink>
      <RouterLink to="/damagecalc">Damage Calculator</RouterLink>
      <RouterLink to="/berrytimer">Berry Timer</RouterLink>
    </nav>
    <main class="router-view-container">
      <RouterView />
    </main>
    <footer>
      Clyde Goodall 2023
      <a href="https://github.com/Clyde-Goodall/pokemmo-toolbox"  target="_">
        <img src="@/assets/img/github-mark.svg" class="footer-link-svg" alt="PokeMMO Toolbox Github Repository Link"/>
      </a>
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
  border-top: 1px solid var(--secondary-color);
  color: rgb(140, 140, 140);
  text-align: center;
  padding: .5rem;
  font-size: 10pt;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
.footer-link-svg {
  width: 20px;
  height: 20px;
}

</style>

