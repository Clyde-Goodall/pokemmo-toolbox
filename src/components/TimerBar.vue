<template>
    <div v-if="props.shown" class="timer-bar">
        <!-- <span>{{ stat }}</span> -->
         <div  class="inner-bar" :style="{'width': `${Math.round(props.progress)}%`, 'background-color': props.color}"></div>
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {useBerryStore} from '@/stores/berries'

const berries = useBerryStore();
const props = defineProps([ 'shown', 'progress', 'color'])
</script>
