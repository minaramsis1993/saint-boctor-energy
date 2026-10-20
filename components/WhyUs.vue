<script setup lang="ts">
const items = [
  { title: 'Best price, no surprises', text: 'Customers tell us our pricing beats the market. You get a clear quote before any work starts.' },
  { title: 'High-quality installation', text: 'Neat, safe, compliant workmanship that is tested and explained at handover.' },
  { title: 'Professional service', text: 'Friendly, punctual and respectful of your home. We keep you informed throughout.' },
  { title: 'Future-ready upgrades', text: 'We plan your switchboard and wiring for solar, batteries and EV charging, so you only pay once.' }
]
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <h2 v-reveal>Why Moorebank Chooses Saint Boctor Energy</h2>
      <div class="grid grid-4">
        <div v-for="(i, n) in items" :key="i.title" v-reveal="n * 100" class="why">
          <h3>{{ i.title }}</h3>
          <p>{{ i.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
