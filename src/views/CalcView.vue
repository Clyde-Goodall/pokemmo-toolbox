
<template>
  <main>
    <div class="calc-container">
      <div class="search-row flex-col gap-sm">
        <div class="flex-row gap-sm">
          <input type="text" list="pokemon-complete" v-model="name" placeholder="e.g. Breloom" @keyup.enter="addToList()" />
          <input type="button" @click="addToList()" value="+"/>
        </div>
        <datalist id="pokemon-complete">
          <option v-for="l in datalistItems(name)" :key="l" :value="l"/>
        </datalist>
        <input class="clamp-width" type="text" v-model="searchString" placeholder="Search" @keyup.enter="search()" />
      </div>
      <div v-if="pkmn.pokemon.length === 0 "></div>
      <div v-else class="items">
        <PokemonCard v-for="item in pkmn.filteredList(searchString)" :key="item.id" :pokemonItem="item" :showDelete="true"/>
      </div>
    </div>
  </main>
   
 </template>
  
<script setup>
  import { ref } from 'vue';
  import { usePokemonStore } from '@/stores/pokemon';
  import ProgressBar from '../components/ProgressBar.vue';
  import PokemonCard from '../components/PokemonCard.vue';
  import { pokemon } from '../assets/pokemon.js';
  import {Dex} from '@pkmn/dex';
  import {Generations} from '@pkmn/data';
  
  const gen = new Generations(Dex);
  const pkmn = usePokemonStore();
  let name = ref('');
  let searchString = ref('');
  
  function addToList() {
    pkmn.addMon(name);
    name.value = '';  
  }

  function checkAbilityValidity(str) {
    return gen.get(9).abilities.get(str) !== undefined
  }

  // function pkmnListWithFilter() {
  //   if(!searchString) return pkmn.pokemon.slice().reverse()
  //   let filteredList = pkmn.pokemon.filter(p => {
  //     return p.name.includes(searchString);
  //   });
  //   return filteredList;
  // }

  function datalistItems(str) {
    let list = [];
    for(let p of pokemon) {
      let P = p.toUpperCase();
      if(P.includes(str.toUpperCase())) list.push(p);
    }
    return list;
  }

</script>