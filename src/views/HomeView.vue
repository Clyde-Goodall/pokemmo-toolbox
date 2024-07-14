
<template>
  <main>
    <i>PokeMMO Toolbox :) </i><br><br>
    
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