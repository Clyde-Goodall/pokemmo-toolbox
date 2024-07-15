
<template>
  <main>
    <div class="calc-container">
      <div class="search-row">
        <input type="text" v-model="name" placeholder="e.g. Breloom" /> <input type="button" @click="addToList()" value="+"/>
      </div>
      <div v-if="pkmn.pokemon.length === 0 "></div>
      <div v-else class="items">
        <div class="pkmn-container" v-for="item in pkmn.reversedList" :key="item.mon.id">
          <div class="icon-nature-row">
            <img class="pkmn-sprite" :src="item.mon.icon.url" :width="item.mon.icon.w" :height="item.mon.icon.h" :alt="item.mon.name" />
            <div class="level-nature-stack">
              <div class="level-row">
                <div class="level-type">
                  <input type="number" class="lvl-val" v-model="item.mon.level" v-on:input="item.calculate()" min="1" max="100"/>
                  <div class="types">
                    <div v-for="type in item.mon.types" :key="type" class="type-bar" :class="type">{{ type }}</div>
                  </div>
                </div>
                <input type="button" value="x" @click="pkmn.remove(item.mon.id)" />
              </div>
              <!-- natures -->
              <select class="natures-dropdown" v-model="item.mon.nature" @change="item.calculate()">
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
          <span class="name">{{ item.mon.name }}</span>
          <!-- hp/atk/ef/spatk/spdef/spd and iv/ev modifiers -->
          <div class="stats">
            <div class="stat-row">
              <!-- HP -->

              <input type="text" class="iv-val" v-model="item.mon.ivSpread.hp" v-on:input="item.calculate()" min="0" max="31"/>
              <input type="text" class="ev-val" v-model="item.mon.evSpread.hp" v-on:input="item.calculate()" min="0" max="252"/>

              <ProgressBar :id="item.mon.id" stat="hp"/>
            </div>
            <div class="stat-row">
              <!-- Attack -->
              <input type="text" class="iv-val" v-model="item.mon.ivSpread.atk" v-on:input="item.calculate()" min="0" max="31"/>
              <input type="text" class="ev-val" v-model="item.mon.evSpread.atk" v-on:input="item.calculate()" min="0" max="252"/>
              <ProgressBar :id="item.mon.id" stat="attack"/>

            </div>
            <div class="stat-row">
              <!-- Defense -->
              <input type="text" class="iv-val" v-model="item.mon.ivSpread.def" v-on:input="item.calculate()" min="0" max="31"/>
              <input type="text" class="ev-val" v-model="item.mon.evSpread.def" v-on:input="item.calculate()" min="0" max="252"/>
              <ProgressBar :id="item.mon.id" stat="defense"/>

            </div>
            <div class="stat-row">
              <!-- Special Attack -->
              <input type="text" class="iv-val" v-model="item.mon.ivSpread.spa" v-on:input="item.calculate()" min="0" max="31"/>
              <input type="text" class="ev-val" v-model="item.mon.evSpread.spa" v-on:input="item.calculate()" min="0" max="252"/>
              <ProgressBar :id="item.mon.id" stat="specialAttack"/>

            </div>
            <div class="stat-row">
              <!-- Special Defense -->
              <input type="text" class="iv-val" v-model="item.mon.ivSpread.spd" v-on:input="item.calculate()" min="0" max="31"/>
              <input type="text" class="ev-val" v-model="item.mon.evSpread.spd" v-on:input="item.calculate()" min="0" max="252"/>
              <ProgressBar :id="item.mon.id" stat="specialDefense"/>

            </div>
            <div class="stat-row">
              <!-- Speed -->
              <input type="text" class="iv-val" v-model="item.mon.ivSpread.spe" v-on:input="item.calculate()" min="0" max="31"/>
              <input type="text" class="ev-val" v-model="item.mon.evSpread.spe" v-on:input="item.calculate()" min="0" max="252"/>
              <ProgressBar :id="item.mon.id" stat="speed"/>

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

  const pkmn = usePokemonStore();
  let name = ref('');

  function addToList() {
    pkmn.addMon(name);
    name.value = '';
  }
</script>