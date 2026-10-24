<script setup lang="ts">
import { useAuthStore } from '@/stores';
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore();

const menuOpen = ref(false)
const activa = ref('section1')
const enHome = computed(() => route.path === '/')

async function irA(id: string) {
  menuOpen.value = false
  if (!enHome.value) {
    await router.push('/')
    await nextTick()
  }
  document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth' })
}

let observer: IntersectionObserver | undefined

function observarSecciones() {
  observer?.disconnect()
  if (!enHome.value) return
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) activa.value = (e.target as HTMLElement).dataset.section!
      })
    },
    { rootMargin: '-40% 0px -55% 0px' },
  )
  document.querySelectorAll('.section').forEach((s) => observer!.observe(s))
}

onMounted(observarSecciones)

watch(
  () => route.path,
  async () => {
    await nextTick()
    observarSecciones()
  },
)

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <header class="main-header clearfix" role="header">
    <div class="logo">
      <a href="#" @click.prevent="irA('section1')"><em>Grad</em> School</a>
    </div>
    <a href="#" class="menu-link" @click.prevent="menuOpen = !menuOpen">
      <i class="fa fa-bars"></i>
    </a>
    <nav class="main-nav" :class="{ active: menuOpen }" role="navigation">
      <ul class="main-menu">
        <li :class="{ active: enHome && activa === 'section1' }">
          <a href="#" @click.prevent="irA('section1')">Home</a>
        </li>
        <li class="has-submenu" :class="{ active: enHome && activa === 'section2' }">
          <a href="#" @click.prevent="irA('section2')">About Us</a>
          <ul class="sub-menu">
            <li><a href="#" @click.prevent="irA('section2')">Who we are?</a></li>
            <li><a href="#" @click.prevent="irA('section3')">What we do?</a></li>
          </ul>
        </li>
        <li :class="{ active: enHome && activa === 'section4' }">
          <a href="#" @click.prevent="irA('section4')">Courses</a>
        </li>
        <li :class="{ active: enHome && activa === 'section6' }">
          <a href="#" @click.prevent="irA('section6')">Contact</a>
        </li>
        <li v-if="authStore.token" :class="{ active: route.path.startsWith('/artistas') }">
          <RouterLink to="/artistas" @click="menuOpen = false">Artistas</RouterLink>
        </li>
        <li :class="{ active: route.path.startsWith('/canciones') }">
          <RouterLink to="/canciones" @click="menuOpen = false">Canciones</RouterLink>
        </li>
      </ul>
    </nav>
  </header>
</template>
