<template>
<div class="pkmn-container basic-border" >
    <div class="icon-nature-row">
        <div class="pkmn-sprite-container" 
            :style="{
            'background-image': `url('${pokemonItem.icon.url}')`,
            }"
        >
        </div>

      <div class="level-nature-stack">
        <div class="level-row">
          <div class="level-type">
            <input type="number" class="lvl-val" v-model="pokemonItem.level" v-on:input="pkmn.calculate(pokemonItem.id)" min="1" max="100"/>
            <div class="types"> <!-- types (1 or 2) -->
              <div v-for="type in pokemonItem.types" :key="type" class="type-bar" :class="type">{{ type }}</div>
            </div>
          </div>
          <input type="button" v-if="showDelete" value="x" @click="pkmn.remove(pokemonItem.id)" />
        </div>
        <!-- natures -->
        <select class="natures-dropdown" v-model="pokemonItem.nature" @change="pkmn.calculate(pokemonItem.id)">
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
    <!-- nickname text input, width calculation based on character count -->
    <input type="text" class="nickname name" v-model="pokemonItem.nickname" maxlength="12" :style="{'width': `${Math.max(pokemonItem.nickname.length + 2, 4)}ch`}"/>
    <div class="ability-and-item-row"> <!-- ability and held pokemon, need autosuggest for both -->
      <select name="ability" v-model="pokemonItem.ability">
        <option value="" disabled selected>Select Ability</option>
        <option v-for="ability in pokemonItem.availableAbilities" :key="ability" :value="ability">{{ ability }}</option>
      </select>
      <input type="text" name="pokemon" placeholder="Held Item" v-model="pokemonItem.heldItem" maxlength="30" />
    </div>
    <div class="stats"> <!-- hp/atk/ef/spatk/spdef/spd and iv/ev modifiers -->
      <div class="stat-row"> <!-- HP -->
        <input type="text" class="iv-val" v-model="pokemonItem.ivSpread.hp" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="31"/>
        <input type="text" class="ev-val" v-model="pokemonItem.evSpread.hp" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="252"/>
        <ProgressBar :id="pokemonItem.id" stat="hp"/>
      </div>
      <div class="stat-row"> <!-- Attack -->
        <input type="text" class="iv-val" v-model="pokemonItem.ivSpread.atk" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="31"/>
        <input type="text" class="ev-val" v-model="pokemonItem.evSpread.atk" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="252"/>
        <ProgressBar :id="pokemonItem.id" stat="attack"/>
      </div>
      <div class="stat-row"> <!-- Defense -->
        <input type="text" class="iv-val" v-model="pokemonItem.ivSpread.def" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="31"/>
        <input type="text" class="ev-val" v-model="pokemonItem.evSpread.def" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="252"/>
        <ProgressBar :id="pokemonItem.id" stat="defense"/>
      </div>
      <div class="stat-row">  <!-- Special Attack -->
        <input type="text" class="iv-val" v-model="pokemonItem.ivSpread.spa" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="31"/>
        <input type="text" class="ev-val" v-model="pokemonItem.evSpread.spa" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="252"/>
        <ProgressBar :id="pokemonItem.id" stat="specialAttack"/>
      </div>
      <div class="stat-row"> <!-- Special Defense -->
        <input type="text" class="iv-val" v-model="pokemonItem.ivSpread.spd" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="31"/>
        <input type="text" class="ev-val" v-model="pokemonItem.evSpread.spd" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="252"/>
        <ProgressBar :id="pokemonItem.id" stat="specialDefense"/>
      </div>
      <div class="stat-row"> <!-- Speed -->
        <input type="text" class="iv-val" v-model="pokemonItem.ivSpread.spe" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="31"/>
        <input type="text" class="ev-val" v-model="pokemonItem.evSpread.spe" v-on:input="pkmn.calculate(pokemonItem.id)" min="0" max="252"/>
        <ProgressBar :id="pokemonItem.id" stat="speed"/>
      </div>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { usePokemonStore } from '@/stores/pokemon';
    import ProgressBar from '../components/ProgressBar.vue';
    import { pokemon } from '../assets/pokemon.js';
    import {Dex} from '@pkmn/dex';
    import {Generations} from '@pkmn/data';
    import {toRefs} from "vue";
    const pkmn = usePokemonStore();

    const props = defineProps({
        pokemonItem: Object,
        showDelete: Boolean
    });
    const { pokemonItem, showDelete } = toRefs(props);

</script>