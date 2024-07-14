<template>
    <div class="stat-bar" :style="{'width': `${Math.floor(Math.pow(found.mon.calculatedStats[props.stat], .45) * 15)}px`}"></div>
</template>

<script setup>
import {toRef, reactive} from 'vue';
import {usePokemonStore} from '@/stores/pokemon'
const pkmn = usePokemonStore();
const props = defineProps(['id', 'stat'])

const maxWidth = 300;
const found = pkmn.pokemon.find(val => {
    if(val.mon.id === props.id) return val;
})
const width = reactive({
    proportional: `${Math.floor(Math.sqrt(found.mon.calculatedStats[props.stat] * 0.45)  )}px`
});


</script>

<!-- <style scoped>
.stat-bar {
    width: v-bind('width.proportional');
}
</style> -->