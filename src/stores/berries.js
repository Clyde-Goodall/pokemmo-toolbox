import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {Dex} from '@pkmn/dex';
import {Icons, Sprites} from '@pkmn/img';
import {Generations} from '@pkmn/data';
const gens = new Generations(Dex);

export const useBerryStore = defineStore('berriess', {
  state: () => ({
    id: 0,
    pokemon: [],
  }),
  getters: {
    reversedList() {
      return this.pokemon.slice().reverse()
    }
  },
  actions: {
    addMon(name) {
      console.log(this.id)

      if(gens.get(5).species.get(name.value) == undefined) return;
      console.log(name.value)
      const entry = new PokemonBuilder();
      entry.init(this.id, name.value)
      this.pokemon.push(entry)
      this.id++;
    },
    remove(i) {
      let loc = -1;
      this.pokemon.forEach((val, i) => {
        if(val.mon.id === i) loc = i
      })
      this.pokemon.splice(loc, 1);
    },
  }
})

class PokemonBuilder {
  // mon = {};
  constructor() {
    this.mon = {
      name: '',
      id: -1,
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
      }
    }
  }

  init(id, name) {
    if(gens.get(5).species.get(name) == undefined) return;
    this.mon.id = id;
    this.mon.name = name;
    this.mon.icon = Sprites.getPokemon(name, {gen: 'gen5bw'});
    this.mon.icon.w = 65;
    this.mon.icon.h = 65;

    this.mon.baseStats = gens.get(5).species.get(name).baseStats;
    this.calculate();

  }

  calculate() {
    // this.calculatedStats.
    const curr = this.mon;
    curr.calculatedStats.hp = Math.floor(((2 * curr.baseStats.hp + curr.ivSpread.hp + Math.floor(curr.evSpread.hp / 4)) * curr.level) / 100) + curr.level + 10;
    const genericStat = (which) => {
      const modifiers = natureMultiplier(curr.nature);
      let multiplier = 1.0
      if(!modifiers.none) {
        if(which == modifiers.increase) multiplier = 1.1;
        if(which == modifiers.decrease) multiplier = 0.9;
      }
      const output = Math.floor((Math.floor(((2 * curr.baseStats[which] + curr.ivSpread[which] + Math.floor(curr.evSpread[which] / 4)) * curr.level) / 100) + 5) * multiplier);
      return output
    }

    curr.calculatedStats.attack = genericStat('atk');
    curr.calculatedStats.defense = genericStat('def');
    curr.calculatedStats.specialAttack = genericStat('spa');
    curr.calculatedStats.specialDefense = genericStat('spd');
    curr.calculatedStats.speed = genericStat('spe');
  }
};

function natureMultiplier(nature) {
  let multipliers = {
    none: false,
    increase: '',
    decrease: ''
  }

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

