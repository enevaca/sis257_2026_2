<script setup lang="ts">
import type { Artista } from '@/models/artista'
import { computed, onMounted, ref } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'

const ENDPOINT = 'artistas'
const artistas = ref<Artista[]>([])
const busqueda = ref<string>('')
const artistaDelete = ref<Artista | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const emit = defineEmits(['edit'])

async function obtenerLista() {
  artistas.value = await http.get(ENDPOINT).then((response) => response.data)
}

const artistasFiltrados = computed(() => {
  return artistas.value.filter(
    (artista) =>
      artista.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      artista.nacionalidad.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(artista: Artista) {
  emit('edit', artista)
}

function mostrarEliminarConfirm(artista: Artista) {
  artistaDelete.value = artista
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${artistaDelete.value?.id}`)
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
      <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre o nacionalidad" />
    </InputGroup>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>Nacionalidad</th>
          <th>Fotografía</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(artista, index) in artistasFiltrados" :key="artista.id">
          <td>{{ index + 1 }}</td>
          <td>{{ artista.nombre }}</td>
          <td>{{ artista.nacionalidad }}</td>
          <td><img :src="artista.fotografia" alt="foto" width="90" height="90" /></td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(artista)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              text
              @click="mostrarEliminarConfirm(artista)"
            />
          </td>
        </tr>
        <tr v-if="artistasFiltrados.length === 0">
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
