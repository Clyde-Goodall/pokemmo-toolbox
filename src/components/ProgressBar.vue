<template>
    <div class="stat-bar" :class="props.stat" :style="{'width': `${Math.floor(Math.pow(found.calculatedStats[props.stat], .4) * 15)}px`}">
        <span>{{ found.calculatedStats[props.stat] }}</span>
    </div>
</template>

<script setup>
import {toRef, reactive} from 'vue';
import {usePokemonStore} from '@/stores/pokemon'
const pkmn = usePokemonStore();
const props = defineProps(['id', 'stat'])

const maxWidth = 300;
const found = pkmn.pokemon.find(val => {
    if(val.id === props.id) return val;
})
const width = reactive({
    proportional: `${Math.floor(Math.sqrt(found.calculatedStats[props.stat] * 0.45)  )}px`
});

</script>

<style scoped>
.stat-bar {
    text-align:center;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 6px 5px 0px rgba(255,255,255,0.58);

    span {
        background: white;
        border: var(--secondary-border);
        border-radius: 5px;
        min-width: 20px;
        padding: 0rem .2rem;
    }
}
</style>