<script setup lang="ts">
import CancionList from '@/components/cancion/CancionList.vue'
import CancionSave from '@/components/cancion/CancionSave.vue'
import { Button } from 'primevue'
import { ref } from 'vue'

const mostrarDialog = ref<boolean>(false)
const cancionesListRef = ref<typeof CancionList | null>(null)
const cancionEdit = ref<any>(null)

function handleCreate() {
  cancionEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(cancion: any) {
  cancionEdit.value = cancion
  mostrarDialog.value = true
}

function handleSave() {
  cancionesListRef.value?.obtenerLista()
}

function handleCloseDialog() {
  mostrarDialog.value = false
}
</script>

<template>
  <section class="section" data-section="section6">
    <div class="container">
      <div class="row pt-6 mt-6">
        <div class="col-md-12">
          <h2>Canciones</h2>
          <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
          <CancionList ref="cancionesListRef" @edit="handleEdit" />
          <CancionSave
            :mostrar="mostrarDialog"
            :cancion="cancionEdit"
            :modoEdicion="!!cancionEdit"
            @guardar="handleSave"
            @close="handleCloseDialog"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
