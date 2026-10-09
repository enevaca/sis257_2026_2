<script setup lang="ts">
import type { IColor } from '@/models/color'

const props = defineProps<{ color: IColor }>()
</script>

<template>
  <li :style="{ color: props.color.clave, fontFamily: 'Impact', fontSize: '25px' }">
    {{ props.color.valor }}
  </li>
</template>

<style scoped></style>
