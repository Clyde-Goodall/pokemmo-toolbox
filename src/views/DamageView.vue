
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
          <div class="pkmn-container" v-for="item in pkmn.filteredList(searchString)" :key="item.id">
            <div class="icon-nature-row">
              <!-- <img class="pkmn-sprite" :src="item.icon.url" :width="item.icon.w" :height="item.icon.h" :alt="item.name" /> -->
              <div class="pkmn-sprite-container" 
                :style="{
                  'background-image': `url('${item.icon.url}')`,
                  'background-repeat': 'no-repeat',
                  'background-position': 'center',
                  'background-size': '90%',
                  }"
                >
                </div>
  
              <div class="level-nature-stack">
                <div class="level-row">
                  <div class="level-type">
                    <input type="number" class="lvl-val" v-model="item.level" v-on:input="pkmn.calculate(item.id)" min="1" max="100"/>
                    <div class="types">
                      <div v-for="type in item.types" :key="type" class="type-bar" :class="type">{{ type }}</div>
                    </div>
                  </div>
                  <input type="button" value="x" @click="pkmn.remove(item.id)" />
                </div>
                <!-- natures -->
                <select class="natures-dropdown" v-model="item.nature" @change="pkmn.calculate(item.id)">
                  <option value="" disabled selected>Select Nature</option>
                  <option value="Adamant">Adamant(+Atk/-SpAtk)</option>
                  <option value="Bashful">Bashful(Neutral)</option>
                  <option value="Bold">Bold(+Def/-Atk)</option>
                  <option value="Brave">Brave(+Atk/-Spd)</option>
                  <option value="Calm">Calm(+SpDef/-Atk)</option>
                  <option value="Careful">Careful(+SpDef/-SpAtk)</option>
                  <option value="Docile">Docile(Neutral)</option>
                  <option value="Gentle">Gentle(+SpDef/-Def)</option>
                  <option value="Hardy">Hardy(Neutral)</option>
                  <option value="Hasty">Hasty(+Spd/-Def)</option>
                  <option value="Impish">Impish(+Def/-SpAtk)</option>
                  <option value="Jolly">Jolly(+Spd/-SpAtk)</option>
                  <option value="Lax">Lax(+Def/-SpDef)</option>
                  <option value="Lonely">Lonely(+Atk/-Def)</option>
                  <option value="Mild">Mild(+SpAtk/-Def)</option>
                  <option value="Modest">Modest(+SpAtk/-Atk)</option>
                  <option value="Naive">Naive(+Spd/-SpDef)</option>
                  <option value="Naughty">Naughty(+Atk/-SpDef)</option>
                  <option value="Quiet">Quiet(+SpAtk/-Spd)</option>
                  <option value="Quirky">Quirky(Neutral)</option>
                  <option value="Rash">Rash(+SpAtk/-SpDef)</option>
                  <option value="Relaxed">Relaxed(+Def/-Spd)</option>
                  <option value="Sassy">Sassy(+SpDef/-Spd)</option>
                  <option value="Serious">Serious(Neutral)</option>
                  <option value="Timid">Timid(+Spd/-Atk)</option>
                </select>
              </div>
            </div>
            <input type="text" class="nickname name" v-model="item.nickname" maxlength="12" :style="{'width': `${Math.max(item.nickname.length + 2, 4)}ch`}"/>
            <div class="ability-and-item-row"> <!-- ability and held item, need autosuggest for both -->
              <select name="ability" v-model="item.ability">
                <option value="" disabled selected>Select Ability</option>
                <option v-for="ability in item.availableAbilities" :key="ability" :value="ability">{{ ability }}</option>
              </select>
              <input type="text" name="item" placeholder="Held item" v-model="item.heldItem" maxlength="30" />
            </div>
            <!-- hp/atk/ef/spatk/spdef/spd and iv/ev modifiers -->
            <div class="stats">
              <div class="stat-row">
                <!-- HP -->
                <input type="text" class="iv-val" v-model="item.ivSpread.hp" v-on:input="pkmn.calculate(item.id)" min="0" max="31"/>
                <input type="text" class="ev-val" v-model="item.evSpread.hp" v-on:input="pkmn.calculate(item.id)" min="0" max="252"/>
  
                <ProgressBar :id="item.id" stat="hp"/>
              </div>
              <div class="stat-row">
                <!-- Attack -->
                <input type="text" class="iv-val" v-model="item.ivSpread.atk" v-on:input="pkmn.calculate(item.id)" min="0" max="31"/>
                <input type="text" class="ev-val" v-model="item.evSpread.atk" v-on:input="pkmn.calculate(item.id)" min="0" max="252"/>
                <ProgressBar :id="item.id" stat="attack"/>
  
              </div>
              <div class="stat-row">
                <!-- Defense -->
                <input type="text" class="iv-val" v-model="item.ivSpread.def" v-on:input="pkmn.calculate(item.id)" min="0" max="31"/>
                <input type="text" class="ev-val" v-model="item.evSpread.def" v-on:input="pkmn.calculate(item.id)" min="0" max="252"/>
                <ProgressBar :id="item.id" stat="defense"/>
  
              </div>
              <div class="stat-row">
                <!-- Special Attack -->
                <input type="text" class="iv-val" v-model="item.ivSpread.spa" v-on:input="pkmn.calculate(item.id)" min="0" max="31"/>
                <input type="text" class="ev-val" v-model="item.evSpread.spa" v-on:input="pkmn.calculate(item.id)" min="0" max="252"/>
                <ProgressBar :id="item.id" stat="specialAttack"/>
  
              </div>
              <div class="stat-row">
                <!-- Special Defense -->
                <input type="text" class="iv-val" v-model="item.ivSpread.spd" v-on:input="pkmn.calculate(item.id)" min="0" max="31"/>
                <input type="text" class="ev-val" v-model="item.evSpread.spd" v-on:input="pkmn.calculate(item.id)" min="0" max="252"/>
                <ProgressBar :id="item.id" stat="specialDefense"/>
  
              </div>
              <div class="stat-row">
                <!-- Speed -->
                <input type="text" class="iv-val" v-model="item.ivSpread.spe" v-on:input="pkmn.calculate(item.id)" min="0" max="31"/>
                <input type="text" class="ev-val" v-model="item.evSpread.spe" v-on:input="pkmn.calculate(item.id)" min="0" max="252"/>
                <ProgressBar :id="item.id" stat="speed"/>
  
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
     
   </template>
    
  <script setup>
    import { ref } from 'vue';
    import { usePokemonStore } from '@/stores/pokemon';
    import ProgressBar from '../components/ProgressBar.vue';
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
  
    function pkmnListWithFilter() {
      if(!searchString) return pkmn.pokemon.slice().reverse()
      let filteredList = pkmn.pokemon.filter(p => {
        return p.name.includes(searchString);
      });
      return filteredList;
    }
  
    function datalistItems(str) {
      let list = [];
      for(let p of pokemon) {
        let P = p.toUpperCase();
        if(P.includes(str.toUpperCase())) list.push(p);
      }
      return list;
    }
  
  </script>