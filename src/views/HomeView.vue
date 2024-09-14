
<template>
  <main>
    <br>
    <h1>Welcome to the PokeMMO Toolbox</h1>
    <br>
    <p>
      It's all quite a work in progress still, but so far the builder/state visualizer  works just fine, but isn't perfect.
      The damage calculator, will, of course, initially be based on the PokeMMO dex and ability/movepools. 
      Eventually I plan on incorporating an option for different official generations.
      <br><br>
      The berry calculator kinda sorta works, but it breaks pretty easily. 
      If you're curious about recipes though, it can figure that out at least :))
      <br><br>
      Feel free to follow the progress or reach out on
      <a href="https://github.com/Clyde-Goodall/pokemmo-toolbox"  target="_">Github</a>. Thanks!

    </p>
  </main>
</template>

<script setup>
  import { ref } from 'vue'
  import {Dex} from '@pkmn/dex';
  import {Icons, Sprites} from '@pkmn/img';
  import {Generations} from '@pkmn/data';
  const gens = new Generations(Dex);
  const breloom = gens.get(5).species.get('breloom').baseStats;
  const {url, w, h, pixelated} = Sprites.getPokemon('breloom', {gen: 'gen5bw'});
</script>

<style scoped>
h1 {
  font-size: 30pt;
  margin: 0 auto;
  text-align:center;
  width: clamp(360px, 70%, 800px);
}
p {
  margin: 0 auto;
  font-size: 14pt;
  width: clamp(300px, 40%, 600px);
}
</style>