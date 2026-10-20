<script setup lang="ts">
const scrolled = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 24)
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="header" :class="{ scrolled }">
    <div class="container header-inner">
      <a href="#top" class="brand" aria-label="Saint Boctor Energy home">
        <span class="bolt" aria-hidden="true">⚡</span> Saint Boctor <span class="accent">Energy</span>
      </a>
      <nav class="nav" aria-label="Main">
        <a href="#services">Services</a>
        <a href="#gallery">Our work</a>
        <a href="#reviews">Reviews</a>
        <a href="#areas">Areas</a>
        <a href="#faq">FAQ</a>
      </nav>
      <div class="header-cta">
        <a class="phone" :href="`tel:${business.phone.replace(/\s/g, '')}`">{{ business.phoneDisplay }}</a>
        <a class="btn btn-primary" href="#quote">Free quote</a>
      </div>
    </div>
  </header>
</template>
