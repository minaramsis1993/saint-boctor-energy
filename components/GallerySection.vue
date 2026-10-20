<script setup lang="ts">
// Photos live in assets/images/gallery/ (sorted by filename). Add more there and they appear automatically.
// Captions are keyed by the part of the filename after the "NN-" prefix.
const files = import.meta.glob('../assets/images/gallery/*.{jpg,jpeg,png,webp,avif}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>

const captions: Record<string, { title: string, tag: string }> = {
  'foxess-inverter-battery': { title: 'FoxESS inverter & battery', tag: 'Battery' },
  'sigenergy-battery': { title: 'Sigenergy home battery', tag: 'Battery' },
  'garage-ev-charger-battery': { title: 'EV charger, inverter & battery in the garage', tag: 'EV charger' },
  'battery-inverter-install': { title: 'Battery & inverter installation', tag: 'Battery' },
  'rooftop-solar': { title: 'Rooftop solar panels', tag: 'Solar' },
  'battery-storage': { title: 'Home battery storage', tag: 'Battery' },
  'switchboard-metering': { title: 'Switchboard & metering upgrade', tag: 'Switchboard' }
}

const photos = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, url], n) => {
    const key = path.split('/').pop()!.replace(/\.\w+$/, '').replace(/^\d+-/, '')
    const cap = captions[key] ?? { title: 'Electrical installation', tag: 'Installation' }
    return { url, title: cap.title, tag: cap.tag, alt: `${cap.title} by Saint Boctor Energy, Moorebank NSW (photo ${n + 1})` }
  })

const track = ref<HTMLElement>()
const active = ref(0)
const open = ref<number | null>(null)
const paused = ref(false)

function slideWidth() {
  const el = track.value?.querySelector<HTMLElement>('.slide')
  return el ? el.offsetWidth + 16 : 0
}
function goTo(n: number) {
  const t = track.value
  if (!t) return
  const max = photos.length - 1
  const i = n < 0 ? max : n > max ? 0 : n
  t.scrollTo({ left: i * slideWidth(), behavior: 'smooth' })
}
function onScroll() {
  const w = slideWidth()
  if (track.value && w) active.value = Math.round(track.value.scrollLeft / w)
}

const close = () => (open.value = null)
const step = (d: number) => { if (open.value !== null) open.value = (open.value + d + photos.length) % photos.length }
function onKey(e: KeyboardEvent) {
  if (open.value === null) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') step(1)
  if (e.key === 'ArrowLeft') step(-1)
}

let timer: ReturnType<typeof setInterval> | undefined
onMounted(() => {
  window.addEventListener('keydown', onKey)
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    timer = setInterval(() => {
      if (!paused.value && open.value === null) goTo(active.value + 1)
    }, 4500)
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clearInterval(timer)
})
</script>

<template>
  <section v-if="photos.length" id="gallery" class="section section-alt">
    <div class="container">
      <h2 v-reveal>Our Recent Work</h2>
      <p v-reveal="80" class="sub">Real installs by Saint Boctor Energy across Moorebank and South-West Sydney.</p>

      <div
        v-reveal="120"
        class="carousel"
        role="region"
        aria-roledescription="carousel"
        aria-label="Recent installation photos"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <div ref="track" class="track" @scroll.passive="onScroll">
          <figure
            v-for="(p, n) in photos"
            :key="p.url"
            class="slide"
            role="group"
            aria-roledescription="slide"
            :aria-label="`${n + 1} of ${photos.length}`"
          >
            <button type="button" class="slide-btn" :aria-label="`Enlarge: ${p.title}`" @click="open = n">
              <img :src="p.url" :alt="p.alt" :loading="n < 3 ? 'eager' : 'lazy'" decoding="async">
              <span class="tag">{{ p.tag }}</span>
            </button>
            <figcaption>{{ p.title }}</figcaption>
          </figure>
        </div>
        <button class="car-btn car-prev" type="button" aria-label="Previous photo" @click="goTo(active - 1)">‹</button>
        <button class="car-btn car-next" type="button" aria-label="Next photo" @click="goTo(active + 1)">›</button>
      </div>

      <div class="dots" role="tablist" aria-label="Choose photo">
        <button
          v-for="(p, n) in photos"
          :key="p.url"
          type="button"
          role="tab"
          :aria-selected="n === active"
          :aria-label="`Go to photo ${n + 1}`"
          :class="{ on: n === active }"
          @click="goTo(n)"
        />
      </div>
    </div>

    <div v-if="open !== null" class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" @click.self="close">
      <button class="lb-btn lb-close" type="button" aria-label="Close" @click="close">✕</button>
      <button class="lb-btn lb-prev" type="button" aria-label="Previous photo" @click="step(-1)">‹</button>
      <img :src="photos[open].url" :alt="photos[open].alt">
      <p class="lb-cap">{{ photos[open].title }}</p>
      <button class="lb-btn lb-next" type="button" aria-label="Next photo" @click="step(1)">›</button>
    </div>
  </section>
</template>
