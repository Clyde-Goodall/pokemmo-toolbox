
<template>
    <main>
        <div class="modifiers"> <!-- modifier toggles and swap would go here -->

        </div>
        <div class="calc-cards-container">
                <PokemonCard 
                    v-if="pkmn.getPkmn(primary.id) !== undefined" 
                    :pokemon-item="pkmn.getPkmn(primary.id)" 
                    :showDelete="false"
                />
                <div v-else class="pkmn-container fake-pkmn-container flex-center">
                    <div class="flex-row gap-sm">
                        <input
                            list="pokemon-search-primary" 
                            v-model="primaryQuery" 
                            placeholder="Pick a pokemon" 
                            @keyup.enter="autoCompleteQueryOnSubmit(primary, primaryQuery)"
                        />
                        <input
                            type="button" 
                            value="+" 
                            @click="autoCompleteQueryOnSubmit(primary, primaryQuery)"
                        />
                        <datalist id="pokemon-search-primary">
                            <option
                                v-for="l in pkmn.filteredList(primaryQuery)" 
                                :key="l.id" 
                                :value="l.id"
                            >
                                {{ l.name }} ({{ l.id }})
                            </option>
                        </datalist>
                    </div>
                </div>
                <div class="between-card-options"> <!-- swap button and arrows -->
                    <button class="switch-button" @click="swap()">
                        <span class="arrow left"></span>
                        <span class="arrow right"></span>
                    </button>
                </div>
            <!-- swap button and/or options also go here in between them -->
            <!-- <div class="card-container"> secondary pokemon -->
                <PokemonCard 
                    v-if="pkmn.getPkmn(secondary.id) !== undefined" 
                    :pokemon-item="pkmn.getPkmn(secondary.id)" 
                    :showDelete="false"
                />
                <div v-else class="pkmn-container fake-pkmn-container flex-center">
                    <div class="flex-row gap-sm">
                        <input
                            list="pokemon-search-primary" 
                            v-model="secondaryQuery" 
                            placeholder="Pick a pokemon" 
                            @keyup.enter="autoCompleteQueryOnSubmit(secondary, secondaryQuery)"
                        />
                        <input
                            type="button" 
                            value="+" 
                            @click="autoCompleteQueryOnSubmit(secondary, secondaryQuery)"
                        />
                        <datalist id="pokemon-search-primary">
                            <option
                                v-for="l in pkmn.filteredList(secondaryQuery)" 
                                :key="l.id" 
                                :value="l.id"
                            >
                                {{ l.name }} ({{ l.id }})
                            </option>
                        </datalist>
                    </div>
                </div>
            <!-- </div> -->
        </div>
    </main>
     
   </template>
    
  <script setup>
    import { ref, toRefs, reactive } from 'vue';
    import { usePokemonStore } from '@/stores/pokemon';
    import ProgressBar from '../components/ProgressBar.vue';
    import PokemonCard from '../components/PokemonCard.vue';
    import { pokemon } from '../assets/pokemon.js';
    import { useRoute } from 'vue-router'
    import {Dex} from '@pkmn/dex';
    import {Generations} from '@pkmn/data';

    const route = useRoute();
    const pkmn = usePokemonStore();
    const gen = new Generations(Dex);
    const props = defineProps({
        primary: Number,
        secondary: Number
    });

    let primaryQuery = ref('');
    let secondaryQuery = ref('');
    let primary = reactive({id: route.params.primary ?? -1});
    let secondary = reactive({id: route.params.secondary ?? -1});

    console.log(`${primary.id}, ${secondary.id}`);
    let name = ref('');
    let searchString = ref('');

    function selectPokemon(which, id) {
        which.id = parseInt(id);
    }

    function autoCompleteQueryOnSubmit(which, query) {
        const last = pkmn.filteredList(query)[0];
        console.log(last.id);
        selectPokemon(which, last.id);
    }

    function swap() {
        const temp = primary.id;
        primary.id = secondary.id;
        secondary.id = temp;
    }
  
  </script>