<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps<{ url: string; titulo?: string }>()
const abierto = defineModel<boolean>({ default: false })

function cerrar() {
  abierto.value = false
}

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') cerrar()
}

watch(abierto, (v) => {
  document.body.style.overflow = v ? 'hidden' : ''
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

onBeforeUnmount(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <Teleport to="body">
    <div v-if="abierto" class="video-modal" @click.self="cerrar">
      <button class="video-modal__close" aria-label="Cerrar" @click="cerrar">&times;</button>
      <iframe
        :src="props.url"
        :title="props.titulo ?? 'Video'"
        allow="autoplay; encrypted-media; fullscreen"
        allowfullscreen
        frameborder="0"
        referrerpolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  </Teleport>
</template>

<style scoped>
.video-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}
.video-modal iframe {
  width: min(900px, 95vw);
  aspect-ratio: 16 / 9;
  height: auto;
}
.video-modal__close {
  position: absolute;
  top: 20px;
  right: 30px;
  background: none;
  border: 0;
  color: #fff;
  font-size: 2.5rem;
  cursor: pointer;
}
</style>
