<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import type { Cancion } from '@/models/cancion'

const ENDPOINT = 'canciones'
const canciones = ref<Cancion[]>([])
const busqueda = ref<string>('')
const cancionDelete = ref<Cancion | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  canciones.value = await http.get(ENDPOINT).then((response) => response.data)
}

const cancionesFiltradas = computed(() => {
  return canciones.value.filter(
    (cancion) =>
      cancion.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.album.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.album.artista.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.genero.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(cancion: Cancion) {
  emit('edit', cancion)
}

function mostrarEliminarConfirm(cancion: Cancion) {
  cancionDelete.value = cancion
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${cancionDelete.value?.id}`)
  await obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <InputGroup>
      <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
      <InputText v-model="busqueda" type="text" placeholder="Buscar por titulo, artista, album o género" />
    </InputGroup>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Fotografía</th>
          <th>Artista</th>
          <th>Album</th>
          <th>Género</th>
          <th>Duración</th>
          <th>Tags</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cancion, index) in cancionesFiltradas" :key="cancion.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cancion.nombre }}</td>
          <td><img :src="cancion.album.artista.fotografia" alt="foto" width="90" height="90" /></td>
          <td>{{ cancion.album.artista.nombre }}</td>
          <td>{{ cancion.album.nombre }}</td>
          <td>{{ cancion.genero.descripcion }}</td>
          <td>{{ cancion.duracion }}</td>
          <td>{{ cancion.tags }}</td>
          <td>
            <Button icon="pi pi-youtube" aria-label="Enlace" text as="a" :href="cancion.url" target="_blank" />
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cancion)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(cancion)"
            />
          </td>
        </tr>
        <tr v-if="cancionesFiltradas.length === 0">
          <td colspan="4">No se encontraron resultados</td>
        </tr>
      </tbody>
    </table>
    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
