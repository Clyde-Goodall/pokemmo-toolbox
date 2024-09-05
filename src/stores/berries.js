import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {Dex} from '@pkmn/dex';
import {Icons, Sprites} from '@pkmn/img';
import {Generations} from '@pkmn/data';
import { useStorage } from '@vueuse/core';
const gens = new Generations(Dex);

export const useBerryStore = defineStore('berries', {
  state: () => ({
    // id: useStorage('berry-id0', 0),
    id: 0,
    // planters: useStorage('berries', []),
    planters: [],
  }),
  getters: {
    reversedList() {
      return this.planters.slice().reverse()
    }
  },
  actions: {
    addPlanter(berry, recipe) {
      const entry = new BerryBuilder();
      entry.init(this.id, berry, recipe);
      this.planters.push(entry);
      this.id++;
    },
    remove(i) {
        let loc = null;
        this.planters.forEach((val, idx) => {
          if(val.planter.id === i) loc = idx;
        })
        if(loc == null) return;
        this.planters.splice(loc, 1);
    },
    calculateProgress() {
      // console.log("balls")
      for(let p of this.planters) {
        p.setProgress();
      }
    }
  }
})

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


class BerryBuilder {
    // mon = {};
    constructor() {
      this.planter = {
        //  0: not engaged, 1: running, 2: paused
        timerState: false,
        timerWasStarted: false,
        timerProgressPercent: 0,
        timeToFullyGrowMs: 0,
        waterLevel: 2,
        berry: '',
        route: -1,
        id: -1,
        timeStartedMs: 0,
        recipe: {
            bitter: 0,
            veryBitter: 0,
            dry: 0,
            veryDry: 0,
            sour: 0,
            verySour: 0,
            spicy: 0,
            verySpicy: 0,
            sweet: 0,
            verySweet: 0,
        },
      }
    }
  
    init(id, berry, recipe) {
      this.planter.berry = berry.value;
      this.planter.recipe = recipe.value
      this.planter.timeToFullyGrowMs = berryProps[berry.value].duration * (60 * 60 * 1000);
      console.log(this.planter.timeToFullyGrowMs)
    }
    
    cycleTimerState() {
      if(!this.planter.timerState) {
        this.planter.timerState = true;
        this.planter.timeStartedMs = Date.now()
        console.log('started timer')
      }
    }

    setProgress() {

      const timeElapsed = Date.now() - this.planter.timeStartedMs;
      this.planter.timerProgressPercent = (timeElapsed / this.planter.timeToFullyGrowMs) * 100;
      // console.log(this.planter.timerProgressPercent);
    }

    formattedText() {
      if(this.planter.timerWasStarted) return ''
      const remainingPercent = ((1 - (this.planter.timerProgressPercent / 100)));
      const hours = remainingPercent * (this.planter.timeToFullyGrowMs / (60 * 60 * 1000));
      const minutes = Math.floor((hours % 1) * 60);
      let timeString = `${Math.floor(hours)}h ${minutes}m`
      return timeString
    }
  };
  
const berryProps = {
  "test":   { "duration": 2 },
  "cheri":  { "duration": 16 },
  "razz":   { "duration": 16 },
  "bluk":   { "duration": 16 },
  "oran":   { "duration": 16 },
  "nanab":  { "duration": 16 },
  "wepear": { "duration": 16 },
  "pinap":  { "duration": 16 },
  "persim": { "duration": 16 },
  "chesto": { "duration": 16 },
  "pecha":  { "duration": 16 },
  "rawst":  { "duration": 16 },
  "aspear": { "duration": 16 },
  "magost": { "duration": 20 },
  "cornn":  { "duration": 20 },
  "rabuta": { "duration": 20 },
  "leppa":  { "duration": 20 },
  "nomel":  { "duration": 20 },
  "iapapa": { "duration": 20 },
  "figy":   { "duration": 20 },
  "wiki":   { "duration": 20 },
  "aguav":  { "duration": 20 },
  "watmel": { "duration": 42 },
  "enigma": { "duration": 42 },
  "belue":  { "duration": 42 },
  "spelon": { "duration": 42 },
  "durin":  { "duration": 42 },
  "occa":   { "duration": 42 },
  "shuca":  { "duration": 42 },
  "coba":   { "duration": 42 },
  "yache":  { "duration": 42 },
  "kasib":  { "duration": 42 },
  "wacan":  { "duration": 42 },
  "tanga":  { "duration": 42 },
  "rowap":  { "duration": 42 },
  "rindo":  { "duration": 42 },
  "payapa": { "duration": 42 },
  "passho": { "duration": 42 },
  "kebia":  { "duration": 42 },
  "haban":  { "duration": 42 },
  "colbur": { "duration": 42 },
  "chople": { "duration": 42 },
  "chilan": { "duration": 42 },
  "babiri": { "duration": 42 },
  "charti": { "duration": 42 },
  "pomeg":  { "duration": 44 },
  "kelpsy": { "duration": 44 },
  "qualot": { "duration": 44 },
  "hondew": { "duration": 44 },
  "grepa":  { "duration": 44 },
  "tamato": { "duration": 44 },
  "lum":    { "duration": 44 },
  "sitrus": { "duration": 44 },
  "custap": { "duration": 44 },
  "jaboca": { "duration": 44 },
  "micle":  { "duration": 44 },
  "petaya": { "duration": 67 },
  "liechi": { "duration": 67 },
  "starf":  { "duration": 67 },
  "lansat": { "duration": 67 },
  "salac":  { "duration": 67 },
  "ganlon": { "duration": 67 },
  "apicot": { "duration": 67 }
};
