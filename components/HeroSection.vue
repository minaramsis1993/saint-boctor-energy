<script setup lang="ts">
// Optional hero photo: drop assets/images/hero.jpg (or .jpeg/.png/.webp) and it is used automatically.
const heroFiles = import.meta.glob('../assets/images/hero.{jpg,jpeg,png,webp}', { eager: true, query: '?url', import: 'default' }) as Record<string, string>
const heroUrl = Object.values(heroFiles)[0]
const heroStyle = heroUrl ? { '--hero-img': `url(${heroUrl})` } : {}
</script>

<template>
  <section id="top" class="hero" :class="{ 'has-photo': heroUrl }" :style="heroStyle">
    <span class="spark s1" aria-hidden="true">⚡</span>
    <span class="spark s2" aria-hidden="true">⚡</span>
    <span class="spark s3" aria-hidden="true">⚡</span>
    <div class="container hero-inner">
      <h1 class="in" style="--i: 1">Electrical Installation in Moorebank &amp; South-West Sydney</h1>
      <p class="lead in" style="--i: 2">
        Switchboard upgrades, EV chargers, home batteries and security systems, installed by licensed
        electricians at a fair, upfront price.
      </p>
      <div class="hero-actions in" style="--i: 3">
        <a class="btn btn-primary btn-lg pulse" href="#quote">Get a free quote</a>
        <a class="btn btn-ghost btn-lg" :href="`tel:${business.phone.replace(/\s/g, '')}`">Call {{ business.phoneDisplay }}</a>
      </div>
      <ul class="trust in" style="--i: 4">
        <li><span class="ck" aria-hidden="true">✓</span>Licensed &amp; insured</li>
        <li><span class="ck" aria-hidden="true">✓</span>Upfront pricing</li>
        <li><span class="ck" aria-hidden="true">✓</span>Locally owned in Moorebank</li>
      </ul>
    </div>
  </section>
</template>
