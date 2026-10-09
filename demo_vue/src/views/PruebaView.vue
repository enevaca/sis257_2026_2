<script setup lang="ts">
import ColorItem from '@/components/ColorItem.vue'
import type { IColor } from '@/models/color'
import { ref } from 'vue'

const titulo = ref<string>('Prueba')
const contador = ref<number>(0)
const colores = ref<IColor[]>([
  { clave: 'red', valor: 'Rojo' },
  { clave: 'yellow', valor: 'Amarillo' },
  { clave: 'green', valor: 'Verde' },
  { clave: 'purple', valor: 'Violeta' },
])

function incrementar() {
  contador.value++
}
</script>

<template>
  <div>
    <h1>{{ titulo }} - {{ contador }}</h1>
    <button @click="incrementar()">Incrementar</button>
    <p v-if="contador % 2 === 0">El contador es par</p>
    <p v-else>El contador es impar</p>
    <ul v-for="(color, index) in colores" :key="index">
      <ColorItem :color="color" />
    </ul>
  </div>
</template>

<style scoped></style>
