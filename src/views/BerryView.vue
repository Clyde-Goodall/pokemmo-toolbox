
<template>
    <main>
      <div class="planter-container">
        <div class="search-row">
            <div class="seed-row">
                <div class="seed-col">
                    <label>Plain Bitter</label>
                    <input type="number" name="bitter" v-model="berrySeeds.bitter" min="0" max="3" v-on:input="getBerryType()"/> 
                </div>
                <div class="seed-col">
                    <label>Very Bitter</label>
                    <input type="number" name="verybitter" v-model="berrySeeds.veryBitter" min="0" max="3" v-on:input="getBerryType()"/> 
                </div>
            </div>
           
            <div class="seed-row">
                <div class="seed-col">
                    <label>Plain Dry</label>
                    <input type="number" name="dry" v-model="berrySeeds.dry" min="0" max="3" v-on:input="getBerryType()"/> 
                </div>
                <div class="seed-col">
                    <label>Very Dry</label>
                    <input type="number" name="verydry" v-model="berrySeeds.veryDry" min="0" max="3" v-on:input="getBerryType()"/> 
                </div>
            </div>
            <div class="seed-row">
                <div class="seed-col">
                    <label>Plain Sour</label>
                    <input type="number" name="sour" v-model="berrySeeds.sour" min="0" max="3" v-on:input="getBerryType()"/> 
                </div>
                <div class="seed-col">
                    <label>Very Sour</label>
                    <input type="number" name="verysour" v-model="berrySeeds.verySour" min="0" max="3" v-on:input="getBerryType()"/> 
                </div>
            </div>
            <div class="seed-row">
                <div class="seed-col">
                    <label>Plain Spicy</label>
                    <input type="number" name="spicy" v-model="berrySeeds.spicy" min="0" max="3"/> 
                </div>
                <div class="seed-col">
                    <label>Very Spicy</label>
                    <input type="number" name="veryspicy" v-model="berrySeeds.verySpicy" min="0" max="3"/> 
                </div>
            </div>
            <div class="seed-row">
                <div class="seed-col">
                    <label>Plain Sweet</label>                 
                    <input type="number" name="sweet" v-model="berrySeeds.sweet" min="0" max="3"/> 
                </div>
                <div class="seed-col">
                    <label>Very Sweet</label>                 
                    <input type="number" name="verysweet" v-model="berrySeeds.verySweet" min="0" max="3"/> 
                </div>
            </div>
            <select class="berries-dropdown medium-wide mtop mright" v-model="berryType">
                <option value="berry" disabled selected >Berry</option>
                <option value="aguav">Aguav</option>
                <option value="apicot">Apicot</option>
                <option value="aspear">Aspear</option>
                <option value="babiri">Babiri</option>
                <option value="belue">Belue</option>
                <option value="bluk">Bluk</option>
                <option value="charti">Charti</option>
                <option value="cheri">Cheri</option>
                <option value="chesto">Chesto</option>
                <option value="chilan">Chilan</option>
                <option value="chople">Chople</option>
                <option value="coba">Coba</option>
                <option value="colbur">Colbur</option>
                <option value="cornn">Cornn</option>
                <option value="custap">Custap</option>
                <option value="durin">Durin</option>
                <option value="enigma">Enigma</option>
                <option value="figy">Figy</option>
                <option value="ganlon">Ganlon</option>
                <option value="grepa">Grepa</option>
                <option value="haban">Haban</option>
                <option value="hondew">Hondew</option>
                <option value="iapapa">Iapapa</option>
                <option value="jaboca">Jaboca</option>
                <option value="kasib">Kasib</option>
                <option value="kebia">Kebia</option>
                <option value="kelpsy">Kelpsy</option>
                <option value="lansat">Lansat</option>
                <option value="leppa">Leppa</option>
                <option value="liechi">Liechi</option>
                <option value="lum">Lum</option>
                <option value="mago">Mago</option>
                <option value="magost">Magost</option>
                <option value="micle">Micle</option>
                <option value="nanab">Nanab</option>
                <option value="nomel">Nomel</option>
                <option value="occa">Occa</option>
                <option value="oran">Oran</option>
                <option value="pamtre">Pamtre</option>
                <option value="passho">Passho</option>
                <option value="payapa">Payapa</option>
                <option value="pecha">Pecha</option>
                <option value="persim">Persim</option>
                <option value="petaya">Petaya</option>
                <option value="pinap">Pinap</option>
                <option value="pomeg">Pomeg</option>
                <option value="qualot">Qualot</option>
                <option value="rawst">Rawst</option>
                <option value="razz">Razz</option>
                <option value="rindo">Rindo</option>
                <option value="rowap">Rowap</option>
                <option value="salac">Salac</option>
                <option value="shuca">Shuca</option>
                <option value="spelon">Spelon</option>
                <option value="sitrus">Sitrus</option>
                <option value="starf">Starf</option>
                <option value="tamato">Tamato</option>
                <option value="tanga">Tanga</option>
                <option value="wacan">Wacan</option>
                <option value="watmel">Watmel</option>
                <option value="wepear">Wepear</option>
                <option value="wiki">Wiki</option>
                <option value="yache">Yache</option>
            </select>
            <input type="button" @click="addToList()" value="+"/>
        </div>
        <div v-if="berries.planter.length === 0 "></div>
        <div v-else class="items">
          <div class="berry-container" v-for="item in berries.reversedList" :key="item.mon.id">
            <div class="icon-nature-row">
              <!-- <img class="pkmn-sprite" :src="item.mon.icon.url" :width="item.mon.icon.w" :height="item.mon.icon.h" :alt="item.mon.name" /> -->
              <div class="level-nature-stack">
                <div class="level-row">
                  <div class="level-type">
                    <input type="number" class="lvl-val" v-model="item.mon.level" v-on:input="item.calculate()" min="1" max="100"/>
                    <div class="types">
                    </div>
                  </div>
                  <input type="button" value="x" @click="pkmn.remove(item.mon.id)" />
                </div>
                <!-- natures -->
                <select class="natures-dropdown" v-model="berry">
                    
                </select>
              </div>
            </div>
            <span class="name">{{ item.mon.name }}</span>
            <!-- hp/atk/ef/spatk/spdef/spd and iv/ev modifiers -->
            <div class="stats">
            
            </div>
          </div>
        </div>
      </div>
    </main>
     
   </template>
    
  <script setup>
    import { ref } from 'vue';
    import { useBerryStore } from '@/stores/berries';
    import ProgressBar from '../components/ProgressBar.vue';
  
    const berries = useBerryStore();
    let berrySeeds = ref({
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
    })

    let berryType = ref('berry');
  
    function addToList() {
      berries.addMon(berry);
      berryType.value = 'berry';
    }

    function generateHashKey(tastes) {
    return `${tastes.bitter}-${tastes.veryBitter}-${tastes.dry}-${tastes.veryDry}-${tastes.sour}-${tastes.verySour}-${tastes.spicy}-${tastes.verySpicy}-${tastes.sweet}-${tastes.verySweet}`;
    }

    function getBerryType() {
        const berryLookup = {
            "0-0-0-2-0-0-0-0-0-0": "wiki",
            "0-2-0-0-0-0-0-0-0-0": "aguav",
            "0-0-0-1-0-1-1-0-0-0": "apicot",
            "0-0-0-0-0-3-0-0-0-0": "aspear",
            "0-0-0-1-0-0-1-1-0-0": "babiri",
            "0-0-0-0-1-1-0-0-0-0": "belue",
            "0-0-1-1-0-0-0-0-2-0": "bluk",
            "0-0-1-1-0-0-0-1-0-0": "charti",
            "0-0-0-0-0-0-3-0-0-0": "cheri",
            "0-0-0-3-0-0-0-0-0-0": "chesto",
            "0-0-0-1-0-0-0-1-1-0": "chilan",
            "0-1-0-0-0-0-1-1-0-0": "chople",
            "1-1-0-1-0-0-0-0-0-0": "coba",
            "0-0-0-1-1-1-1-0-0-0": "colbur",
            "0-0-1-1-0-0-0-0-1-0": "cornn",
            "0-0-1-2-0-0-0-0-0-2": "custap",
            "1-2-0-0-1-0-0-0-0-0": "durin",
            "0-0-1-1-0-0-0-2-0-0": "enigma",
            "0-0-0-0-0-0-0-1-0-1": "figy",
            "1-0-0-1-0-0-0-0-1-0": "ganlon",
            "0-0-1-1-0-1-1-0-0-0": "grepa",
            "1-1-0-0-0-0-0-0-0-1": "haban",
            "0-1-1-0-0-0-0-0-1-0": "hondew",
            "0-0-0-0-2-0-0-0-0-0": "iapapa",
            "1-2-0-0-0-1-0-0-0-0": "jaboca",
            "0-0-1-1-0-0-0-1-0-1": "kasib",
            "0-0-1-1-0-1-0-0-0-1": "kebia",
            "0-0-1-1-0-1-0-0-0-1": "kelpsy",
            "1-1-0-1-0-0-0-0-1-1": "lansat",
            "0-1-1-0-0-0-0-1-0-1": "leppa",
            "1-1-0-1-0-0-0-0-0-1": "liechi",
            "0-1-1-1-0-0-0-1-0-1": "lum",
            "0-0-0-1-0-0-0-0-2-0": "mago",
            "0-1-0-1-0-0-0-0-1-1": "magost",
            "0-0-1-2-0-0-0-0-1-0": "micle",
            "0-0-0-1-0-0-0-0-2-0": "nanab",
            "0-0-1-1-0-0-0-1-0-1": "nomel",
            "0-0-1-1-0-0-0-1-0-1": "occa",
            "1-0-1-0-0-0-0-0-0-0": "oran",
            "0-0-0-2-0-0-0-0-1-0": "pamtre",
            "1-1-1-0-0-0-0-0-0-0": "passho",
            "0-1-0-1-0-0-0-0-1-0": "payapa",
            "0-0-0-0-0-0-0-0-3-0": "pecha",
            "0-1-1-0-0-0-0-1-0-1": "persim",
            "1-1-0-1-0-0-0-1-0-0": "petaya",
            "0-1-0-0-0-0-0-2-0-0": "pinap",
            "1-1-0-1-0-0-0-1-0-0": "pomeg",
            "0-1-0-0-0-0-0-0-2-0": "qualot",
            "0-1-0-0-0-0-0-0-3-0": "rawst",
            "0-1-1-1-0-0-0-1-0-0": "razz",
            "1-1-0-1-0-0-0-1-0-0": "rindo",
            "0-1-0-2-0-0-0-1-0-0": "rowap",
            "1-1-0-1-0-0-0-0-0-1": "salac",
            "0-1-1-0-0-0-0-1-0-1": "shuca",
            "0-0-1-2-0-0-0-1-0-0": "spelon",
            "1-1-0-1-0-0-0-0-0-1": "sitrus",
            "0-1-0-1-0-0-0-0-1-1": "starf",
            "0-0-1-1-0-0-0-1-0-1": "tamato",
            "0-1-0-0-0-0-0-0-2-0": "tanga",
            "1-1-0-1-0-0-0-0-1-1": "wacan",
            "1-0-1-0-0-0-0-0-2-0": "watmel",
            "1-2-0-0-0-0-0-1-0-0": "wepear",
            "0-0-1-2-0-0-0-0-0-0": "wiki",
            "1-1-0-1-0-0-0-0-0-1": "yache"
        };

        const hashKey = generateHashKey(berrySeeds.value);
        const output = berryLookup[hashKey]
        if(output) {
            berryType.value = output
            return
        }
        berryType.value = "berry"
        
        console.log(berryType.value)
    }
</script>