<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import http from '@/plugins/axios'
import { Button, Dialog, InputText, Select, Textarea } from 'primevue'
import type { Cancion } from '@/models/cancion'
import type { Genero } from '@/models/genero'
import type { Album } from '@/models/album'

const ENDPOINT = 'canciones'
const props = defineProps({
  mostrar: Boolean,
  cancion: {
    type: Object as () => Cancion,
    default: () => ({}) as Cancion,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])
const cancion = ref<Cancion>({ ...props.cancion })
watch(
  () => props.cancion,
  (newVal) => {
    cancion.value = { ...newVal }
  },
)

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const generos = ref<Genero[]>([])
const albumes = ref<Album[]>([])

async function obtenerGeneros() {
  generos.value = await http.get('generos').then((res) => res.data)
}

async function obtenerAlbumes() {
  albumes.value = await http.get('albumes').then((res) => res.data)
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerGeneros()
      obtenerAlbumes()

      if (props.cancion?.id) {
        cancion.value = { ...props.cancion }
      } else {
        cancion.value = { genero: { id: 0 }, album: { id: 0 } } as Cancion
      }
    }
  },
)

async function handleSave() {
  try {
    const body = {
      idAlbum: cancion.value.album.id,
      idGenero: cancion.value.genero.id,
      nombre: cancion.value.nombre,
      duracion: cancion.value.duracion,
      tags: cancion.value.tags,
      url: cancion.value.url,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cancion.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cancion.value = {} as Cancion
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="props.modoEdicion ? 'Editar' : 'Crear'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="genero" class="font-semibold w-3">Género</label>
        <Select
          id="genero"
          v-model="cancion.genero.id"
          :options="generos"
          optionLabel="descripcion"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="album" class="font-semibold w-3">Album</label>
        <Select
          id="album"
          v-model="cancion.album.id"
          :options="albumes"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText id="nombre" v-model="cancion.nombre" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracion" class="font-semibold w-3">Duración</label>
        <InputText id="duracion" v-model="cancion.duracion" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tags" class="font-semibold w-3">Tags</label>
        <InputText id="tags" v-model="cancion.tags" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="url" class="font-semibold w-3">URL</label>
        <Textarea id="url" v-model="cancion.url" class="flex-auto" autocomplete="off" />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
