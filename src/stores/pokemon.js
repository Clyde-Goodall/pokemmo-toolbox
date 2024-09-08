import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import {Dex} from '@pkmn/dex';
import {Icons, Sprites} from '@pkmn/img';
import {Generations} from '@pkmn/data';
import pmmoJson from '../assets/monsters.json'
const gens = new Generations(Dex);
console.log(pmmoJson[0].abilities)
export const usePokemonStore = defineStore('pokemon', {
  state: () => ({
    id: useStorage('pokemon-id', 0),
    // id: 0,
    pokemon: useStorage('pokemon', []),
    // pokemon: [],
  }),
  getters: {
    reversedList() {
      console.log(this.pokemon);
      return this.pokemon.slice().reverse()
    },
    filteredList: (state) => {
      return (str) => {
        console.log(str);
        str = str.trim();
        if(!str) return state.pokemon.slice().reverse();
        return state.pokemon.filter(pkmn => {
          console.log(`${pkmn.name}-${pkmn.nickname}-${pkmn.heldItem ? pkmn.heldItem : 'none' }-${pkmn.ability}-${pkmn.dexNum}`.replace(' ', ''));
          return `${pkmn.name}-${pkmn.nickname}-${pkmn.heldItem}-${pkmn.ability}-${pkmn.dexNum}`.toLowerCase().replace(' ', '').includes(str.toLowerCase().replace(' ', ''));
        }).slice().reverse()
      }
    },
    getPkmn: (state) => {
      return (id) => state.pokemon.find(pkmn => {
        if(pkmn.id === id) return pkmn;
      })
    }
  },
  actions: {

    addMon(name) {
      if(gens.get(5).species.get(name.value) == undefined) return;
      // default object defs
      let mon = {
        id: -1,
        name: '',
        nickname: '',
        heldItem: '',
        availableAbilities: [],
        ability: '',
        moves: [],
        types:[],
        dexNum: -1,
        level: 50,
        icon: {},
        baseStats: {},
        calculatedStats: {
          hp: 0,
          attack: 0,
          defense: 0,
          specialAttack: 0,
          specialDefense: 0,
          speed: 0,
        },
        nature: '',
        evSpread: {
          hp: 0,
          atk: 0,
          def: 0,
          spa: 0,
          spd: 0,
          spe: 0,
        },
        ivSpread: {
          hp: 31,
          atk: 31,
          def: 31,
          spa: 31,
          spd: 31,
          spe: 31,
        },
        evSpreadPrev: {
          hp: 0,
          atk: 0,
          def: 0,
          spa: 0,
          spd: 0,
          spe: 0,
        },
        ivSpreadPrev: {
          hp: 31,
          atk: 31,
          def: 31,
          spa: 31,
          spd: 31,
          spe: 31,
        }
      };
      // const entry = new PokemonBuilder();
      this.init(mon, this.id, name.value)
      this.pokemon.push(mon)
      this.id++;
    },
    remove(i) {
      let loc = null;
      this.pokemon.forEach((val, idx) => {
        if(this.pokemon[idx].id === i) loc = idx
      });
      if(loc == null) return;
      this.pokemon.splice(loc, 1);
    },
    init(mon, id, name) {
      mon.id = id;
      mon.name = name;
      mon.nickname = name;
      mon.icon = Sprites.getPokemon(name, {gen: 'gen5bw'});
      mon.icon.w = 65;
      mon.icon.h = 65;
      mon.availableAbilities = filterPmmoJsonAbilities(name);
      mon.baseStats = gens.get(5).species.get(name).baseStats;
      mon.types = [].concat(gens.get(5).species.get(name).types);
      for(let [i, item] of mon.types.entries()) {
        mon.types[i] = item.toLowerCase()
      }
      this.calculate(id, mon);
    },
    calculate(id, mon=null) {
      // extraneous stuff first
      const curr = mon === null ? this.getPkmn(id) : mon;
      limitSpreads(0, 31, curr.ivSpread, curr.ivSpreadPrev)
      limitSpreads(0, 252, curr.evSpread, curr.evSpreadPrev)
  
      const genericStat = (which) => {
        const modifiers = natureMultiplier(curr.nature);
        let multiplier = 1.0
        if(!modifiers.none) {
          if(which == modifiers.increase) multiplier = 1.1;
          if(which == modifiers.decrease) multiplier = 0.9;
        }
        curr.ivSpreadPrev[which] = curr.ivSpread[which]
        curr.evSpreadPrev[which] = curr.evSpread[which]
  
        const output = Math.floor((Math.floor(((2 * curr.baseStats[which] + curr.ivSpread[which] + Math.floor(curr.evSpread[which] / 4)) * curr.level) / 100) + 5) * multiplier);
        return output
      }
      curr.calculatedStats.hp = Math.floor(((2 * curr.baseStats.hp + curr.ivSpread.hp + Math.floor(curr.evSpread.hp / 4)) * curr.level) / 100) + curr.level + 10;
      curr.calculatedStats.attack = genericStat('atk');
      curr.calculatedStats.defense = genericStat('def');
      curr.calculatedStats.specialAttack = genericStat('spa');
      curr.calculatedStats.specialDefense = genericStat('spd');
      curr.calculatedStats.speed = genericStat('spe');
    }
  }
})
// caps a spread of stats to their min or max, like evs or ivs
function limitSpreads(min, max, spread, lastSpread) {
  for(let k in spread) {
    if(spread[k] !== '') spread[k] = parseInt(spread[k].toString().replace(/\D/g,''));
    if(spread[k] !== lastSpread[k] && spread[k] < min && spread[k] > max) spread[k] = spread[k]
    if(spread[k] < min) spread[k] = min;
    if(spread[k] > max) spread[k] = max;
    if(spread[k] === '') spread[k] = 0;
  }
}

// kind of obvious
function natureMultiplier(nature) {
  let multipliers = {
    none: false,
    increase: '',
    decrease: ''
  }
  // I wish there was a more elegant way to do this that I could think of off the top of my head. 
  switch (nature) {
    // Neutral natures (no increase or decrease)
    case 'Hardy':
    case 'Docile':
    case 'Serious':
    case 'Bashful':
    case 'Quirky':
    // the rest of them
      multipliers.none = true;
      break;
    case 'Lonely':
      multipliers.increase = 'atk';
      multipliers.decrease = 'def';
      break;
    case 'Brave':
      multipliers.increase = 'atk';
      multipliers.decrease = 'spe';
      break;
    case 'Adamant':
      multipliers.increase = 'atk';
      multipliers.decrease = 'spa';
      break;
    case 'Naughty':
      multipliers.increase = 'atk';
      multipliers.decrease = 'spd';
      break;
    case 'Bold':
      multipliers.increase = 'def';
      multipliers.decrease = 'atk';
      break;
    case 'Relaxed':
      multipliers.increase = 'def';
      multipliers.decrease = 'spe';
      break;
    case 'Impish':
      multipliers.increase = 'def';
      multipliers.decrease = 'spa';
      break;
    case 'Lax':
      multipliers.increase = 'def';
      multipliers.decrease = 'spd';
      break;
    case 'Timid':
      multipliers.increase = 'spe';
      multipliers.decrease = 'atk';
      break;
    case 'Hasty':
      multipliers.increase = 'spe';
      multipliers.decrease = 'def';
      break;
    case 'Jolly':
      multipliers.increase = 'spe';
      multipliers.decrease = 'spa';
      break;
    case 'Naive':
      multipliers.increase = 'spe';
      multipliers.decrease = 'spd';
      break;
    case 'Modest':
      multipliers.increase = 'spa';
      multipliers.decrease = 'atk';
      break;
    case 'Mild':
      multipliers.increase = 'spa';
      multipliers.decrease = 'def';
      break;
    case 'Quiet':
      multipliers.increase = 'spa';
      multipliers.decrease = 'spe';
      break;
    case 'Rash':
      multipliers.increase = 'spa';
      multipliers.decrease = 'spd';
      break;
    case 'Calm':
      multipliers.increase = 'spd';
      multipliers.decrease = 'atk';
      break;
    case 'Gentle':
      multipliers.increase = 'spd';
      multipliers.decrease = 'def';
      break;
    case 'Sassy':
      multipliers.increase = 'spd';
      multipliers.decrease = 'spe';
      break;
    case 'Careful':
      multipliers.increase = 'spd';
      multipliers.decrease = 'spa';
      break;
    default:
      multipliers.none = true;
      break;
  }

  return multipliers;
}

function filterPmmoJsonAbilities(pkmn) {
  const abilitiesObjArray = pmmoJson.find(p => {
    return p.name.toLowerCase() === pkmn.toLowerCase()
  })
  let abilitiesArray = []
  for(let a of abilitiesObjArray.abilities) {
    abilitiesArray.push(a.name);
  }
  return abilitiesArray;
}