<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import VideoModal from '@/components/VideoModal.vue'
import type { Artista } from '@/models/artista'
import http from '@/plugins/axios'

/* ---------- Navegación ---------- */
function irA(id: string) {
  document.querySelector(`[data-section="${id}"]`)?.scrollIntoView({ behavior: 'smooth' })
}

/* ---------- Features ---------- */
const features = [
  {
    icono: 'fa-pencil',
    titulo: 'All Courses',
    destino: 'section2',
    boton: 'More Info.',
    clase: '',
  },
  {
    icono: 'fa-graduation-cap',
    titulo: 'Virtual Class',
    destino: 'section3',
    boton: 'Details',
    clase: 'second-features',
  },
  {
    icono: 'fa-book',
    titulo: 'Real Meeting',
    destino: 'section4',
    boton: 'Read More',
    clase: 'third-features',
  },
]

/* ---------- Tabs (Why us) ---------- */
const tab = ref(1)
const tabs = [
  {
    id: 1,
    titulo: 'Best Education',
    img: 'choose-us-image-01.png',
    parrafos: [
      'Grad School is free educational HTML template with Bootstrap 4.5.2 CSS layout. Feel free to use it for educational or commercial purposes. You may want to make a little donation to TemplateMo. Please tell your friends about us. Thank you.',
    ],
  },
  {
    id: 2,
    titulo: 'Top Management',
    img: 'choose-us-image-02.png',
    parrafos: [
      'You can modify this HTML layout by editing contents and adding more pages as you needed. Since this template has options to add dropdown menus, you can put many HTML pages.',
      'Suspendisse tincidunt, magna ut finibus rutrum, libero dolor euismod odio, nec interdum quam felis non ante.',
    ],
  },
  {
    id: 3,
    titulo: 'Quality Meeting',
    img: 'choose-us-image-03.png',
    parrafos: [
      'You are NOT allowed to redistribute this template ZIP file on any template collection website. However, you can use this template to convert into a specific theme for any kind of CMS platform such as WordPress. For more information, you shall contact TemplateMo now.',
    ],
  },
]

/* ---------- Contador regresivo ---------- */
const objetivo = new Date('2026-12-31T23:59:59').getTime()
const dias = ref('00')
const horas = ref('00')
const minutos = ref('00')
const segundos = ref('00')
const pad = (n: number) => String(n).padStart(2, '0')

function actualizar() {
  const diff = Math.max(0, objetivo - Date.now())
  dias.value = pad(Math.floor(diff / 86400000))
  horas.value = pad(Math.floor((diff % 86400000) / 3600000))
  minutos.value = pad(Math.floor((diff % 3600000) / 60000))
  segundos.value = pad(Math.floor((diff % 60000) / 1000))
}

let timer: number
onMounted(() => {
  actualizar()
  timer = window.setInterval(actualizar, 1000)
})
onBeforeUnmount(() => clearInterval(timer))

/* ---------- Formulario de registro ---------- */
const registro = reactive({ nombre: '', email: '', telefono: '' })
function enviarRegistro() {
  console.log('Registro:', { ...registro })
  registro.nombre = registro.email = registro.telefono = ''
}

/* ---------- Cursos ---------- */
const cursos = [
  {
    titulo: 'Digital Marketing',
    texto:
      'You can get free images and videos for your websites by visiting Unsplash, Pixabay, and Pexels.',
    img: 'courses-01.jpg',
    autor: 'author-01.png',
    gratis: false,
  },
  {
    titulo: 'Business World',
    texto:
      'Quisque cursus augue ut velit dictum, quis volutpat enim blandit. Maecenas a lectus ac ipsum porta.',
    img: 'courses-02.jpg',
    autor: 'author-02.png',
    gratis: true,
  },
  {
    titulo: 'Media Technology',
    texto:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec. Maecenas finibus lobortis enim.',
    img: 'courses-03.jpg',
    autor: 'author-03.png',
    gratis: false,
  },
  {
    titulo: 'Communications',
    texto:
      'Download free images and videos for your websites by visiting Unsplash, Pixabay, and Pexels.',
    img: 'courses-04.jpg',
    autor: 'author-04.png',
    gratis: true,
  },
  {
    titulo: 'Business Ethics',
    texto:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec. Maecenas finibus lobortis enim.',
    img: 'courses-05.jpg',
    autor: 'author-05.png',
    gratis: false,
  },
  {
    titulo: 'Photography',
    texto:
      'Quisque cursus augue ut velit dictum, quis volutpat enim blandit. Maecenas a lectus ac ipsum porta.',
    img: 'courses-01.jpg',
    autor: 'author-01.png',
    gratis: true,
  },
  {
    titulo: 'Web Development',
    texto:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec. Maecenas finibus lobortis enim.',
    img: 'courses-02.jpg',
    autor: 'author-02.png',
    gratis: true,
  },
  {
    titulo: 'Learn HTML CSS',
    texto:
      'You can get free images and videos for your websites by visiting Unsplash, Pixabay, and Pexels.',
    img: 'courses-03.jpg',
    autor: 'author-03.png',
    gratis: false,
  },
  {
    titulo: 'Social Media',
    texto:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec. Maecenas finibus lobortis enim.',
    img: 'courses-04.jpg',
    autor: 'author-04.png',
    gratis: false,
  },
  {
    titulo: 'Digital Arts',
    texto:
      'Quisque cursus augue ut velit dictum, quis volutpat enim blandit. Maecenas a lectus ac ipsum porta.',
    img: 'courses-05.jpg',
    autor: 'author-05.png',
    gratis: true,
  },
  {
    titulo: 'Media Streaming',
    texto:
      'Pellentesque ultricies diam magna, auctor cursus lectus pretium nec. Maecenas finibus lobortis enim.',
    img: 'courses-01.jpg',
    autor: 'author-01.png',
    gratis: false,
  },
]

/* ---------- Artistas ---------- */
const artistas = ref<Artista[]>([])
async function obtenerArtistas() {
  artistas.value = await http.get('artistas').then((response) => response.data)
}

/* ---------- Video (modal con YouTube) ---------- */
const videoAbierto = ref(false)
const videoUrl = 'https://www.youtube.com/embed/r9LtOG6pNUw?autoplay=1'

/* ---------- Contacto ---------- */
const contacto = reactive({ nombre: '', email: '', mensaje: '' })
function enviarContacto() {
  console.log('Contacto:', { ...contacto })
  contacto.nombre = contacto.email = contacto.mensaje = ''
}

onMounted(() => {
  obtenerArtistas()
})
</script>

<template>
  <!-- ***** Banner ***** -->
  <section class="section main-banner" id="top" data-section="section1">
    <video autoplay muted loop id="bg-video">
      <source src="/images/pexels-2022395.mp4" type="video/mp4" />
    </video>

    <div class="video-overlay header-text">
      <div class="caption">
        <h6>Graduate School of Management</h6>
        <h2><em>Your</em> Classroom</h2>
        <div class="main-button">
          <div class="scroll-to-section">
            <a href="#" @click.prevent="irA('section2')">Discover more</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ***** Features ***** -->
  <section class="features">
    <div class="container">
      <div class="row">
        <div v-for="f in features" :key="f.titulo" class="col-lg-4 col-12">
          <div class="features-post" :class="f.clase">
            <div class="features-content">
              <div class="content-show">
                <h4><i class="fa" :class="f.icono"></i>{{ f.titulo }}</h4>
              </div>
              <div class="content-hide">
                <p>
                  Curabitur id eros vehicula, tincidunt libero eu, lobortis mi. In mollis eros a
                  posuere imperdiet. Donec maximus elementum ex. Cras convallis ex rhoncus, laoreet
                  libero eu, vehicula libero.
                </p>
                <p class="hidden-sm">
                  Curabitur id eros vehicula, tincidunt libero eu, lobortis mi. In mollis eros a
                  posuere imperdiet.
                </p>
                <div class="scroll-to-section">
                  <a href="#" @click.prevent="irA(f.destino)">{{ f.boton }}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ***** Why us (tabs) ***** -->
  <section class="section why-us" data-section="section2">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading"><h2>Why choose Grad School?</h2></div>
        </div>
        <div class="col-md-12">
          <div id="tabs">
            <ul>
              <li v-for="t in tabs" :key="t.id">
                <a
                  href="#"
                  :class="{ active: tab === t.id, 'ui-tabs-active': tab === t.id }"
                  @click.prevent="tab = t.id"
                >
                  {{ t.titulo }}
                </a>
              </li>
            </ul>
            <section class="tabs-content">
              <template v-for="t in tabs" :key="t.id">
                <article v-if="tab === t.id">
                  <div class="row">
                    <div class="col-md-6"><img :src="`/images/${t.img}`" alt="" /></div>
                    <div class="col-md-6">
                      <h4>{{ t.titulo }}</h4>
                      <p v-for="(p, i) in t.parrafos" :key="i">{{ p }}</p>
                    </div>
                  </div>
                </article>
              </template>
            </section>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ***** Coming soon (contador + registro) ***** -->
  <section class="section coming-soon" data-section="section3">
    <div class="container">
      <div class="row">
        <div class="col-md-7 col-12">
          <div class="continer centerIt">
            <div>
              <h4>Take <em>any online course</em> and win $326 for your next class</h4>
              <div class="counter">
                <div class="days">
                  <div class="value">{{ dias }}</div>
                  <span>Days</span>
                </div>
                <div class="hours">
                  <div class="value">{{ horas }}</div>
                  <span>Hours</span>
                </div>
                <div class="minutes">
                  <div class="value">{{ minutos }}</div>
                  <span>Minutes</span>
                </div>
                <div class="seconds">
                  <div class="value">{{ segundos }}</div>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="right-content">
            <div class="top-content">
              <h6>
                Register your free account and <em>get immediate</em> access to online courses
              </h6>
            </div>
            <form id="registro" @submit.prevent="enviarRegistro">
              <div class="row">
                <div class="col-md-12">
                  <fieldset>
                    <input
                      v-model="registro.nombre"
                      type="text"
                      class="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-md-12">
                  <fieldset>
                    <input
                      v-model="registro.email"
                      type="email"
                      class="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-md-12">
                  <fieldset>
                    <input
                      v-model="registro.telefono"
                      type="text"
                      class="form-control"
                      placeholder="Your Phone Number"
                      required
                    />
                  </fieldset>
                </div>
                <div class="col-md-12">
                  <fieldset>
                    <button type="submit" class="button">Get it now</button>
                  </fieldset>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ***** Artistas ***** -->
  <section class="section courses" data-section="artistas">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading"><h2>Conoce a los artistas</h2></div>
        </div>
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :breakpoints="{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 4 } }"
        >
          <SwiperSlide v-for="artista in artistas" :key="artista.id">
            <div class="item">
              <img :src="artista.fotografia" :alt="artista.nombre" width="285px" />
              <div class="down-content">
                <h4>{{ artista.nombre }}</h4>
                <p>{{ artista.nacionalidad }}</p>
                <!-- <div class="author-image">
                  <img :src="`/images/${c.autor}`" :alt="`Author ${c.titulo}`" />
                </div>
                <div :class="c.gratis ? 'text-button-free' : 'text-button-pay'">
                  <a href="#" @click.prevent>
                    {{ c.gratis ? 'Free' : 'Pay' }} <i class="fa fa-angle-double-right"></i>
                  </a>
                </div> -->
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

  <!-- ***** Courses (carrusel) ***** -->
  <section class="section courses" data-section="section4">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading"><h2>Choose Your Course</h2></div>
        </div>
        <Swiper
          :modules="[Autoplay]"
          :slides-per-view="1"
          :space-between="20"
          :loop="true"
          :autoplay="{ delay: 3500, disableOnInteraction: false }"
          :breakpoints="{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 4 } }"
        >
          <SwiperSlide v-for="c in cursos" :key="c.titulo">
            <div class="item">
              <img :src="`/images/${c.img}`" :alt="c.titulo" />
              <div class="down-content">
                <h4>{{ c.titulo }}</h4>
                <p>{{ c.texto }}</p>
                <div class="author-image">
                  <img :src="`/images/${c.autor}`" :alt="`Author ${c.titulo}`" />
                </div>
                <div :class="c.gratis ? 'text-button-free' : 'text-button-pay'">
                  <a href="#" @click.prevent>
                    {{ c.gratis ? 'Free' : 'Pay' }} <i class="fa fa-angle-double-right"></i>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>

  <!-- ***** Video ***** -->
  <section class="section video" data-section="section5">
    <div class="container">
      <div class="row">
        <div class="col-md-6 align-self-center">
          <div class="left-content">
            <span>our presentation is for you</span>
            <h4>Watch the video to learn more <em>about Grad School</em></h4>
            <p>
              You are NOT allowed to redistribute this template ZIP file on any template collection
              website. However, you can use this template to convert into a specific theme for any
              kind of CMS platform such as WordPress. You may contact TemplateMo for details.
              <br /><br />
              Suspendisse tincidunt, magna ut finibus rutrum, libero dolor euismod odio, nec
              interdum quam felis non ante.
            </p>
            <div class="main-button">
              <a rel="nofollow" href="https://fb.com/templatemo" target="_blank">External URL</a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <article class="video-item">
            <div class="video-caption"><h4>Power HTML Template</h4></div>
            <figure>
              <a href="#" class="play" @click.prevent="videoAbierto = true">
                <img src="/images/main-thumb.png" alt="Video" />
              </a>
            </figure>
          </article>
        </div>
      </div>
    </div>

    <VideoModal v-model="videoAbierto" :url="videoUrl" titulo="Power HTML Template" />
  </section>

  <!-- ***** Contact ***** -->
  <section class="section contact" data-section="section6">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="section-heading"><h2>Let’s Keep In Touch</h2></div>
        </div>
        <div class="col-md-6">
          <form id="contact" @submit.prevent="enviarContacto">
            <div class="row">
              <div class="col-md-6">
                <fieldset>
                  <input
                    v-model="contacto.nombre"
                    type="text"
                    class="form-control"
                    placeholder="Your Name"
                    required
                  />
                </fieldset>
              </div>
              <div class="col-md-6">
                <fieldset>
                  <input
                    v-model="contacto.email"
                    type="email"
                    class="form-control"
                    placeholder="Your Email"
                    required
                  />
                </fieldset>
              </div>
              <div class="col-md-12">
                <fieldset>
                  <textarea
                    v-model="contacto.mensaje"
                    rows="6"
                    class="form-control"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </fieldset>
              </div>
              <div class="col-md-12">
                <fieldset>
                  <button type="submit" class="button">Send Message Now</button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <div id="map">
            <iframe
              src="https://maps.google.com/maps?q=Av.+L%C3%BAcio+Costa,+Rio+de+Janeiro+-+RJ,+Brazil&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="422px"
              frameborder="0"
              style="border: 0"
              allowfullscreen
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Carrusel (reemplaza owl.css) */
.courses .swiper {
  width: 100%;
}
.courses .item {
  width: 100%;
}
</style>
