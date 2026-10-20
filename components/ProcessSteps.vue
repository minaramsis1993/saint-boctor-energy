<script setup lang="ts">
const steps = [
  { t: 'Enquire', d: 'Call or send the form. We reply fast.' },
  { t: 'Free quote', d: 'Clear, itemised pricing with no pressure.' },
  { t: 'Installation', d: 'Licensed electricians complete the work cleanly.' },
  { t: 'Handover', d: 'We test, explain and provide compliance paperwork.' }
]
</script>

<template>
  <section class="section section-alt">
    <div class="container">
      <h2 v-reveal>How It Works</h2>
      <ol class="steps">
        <li v-for="(s, n) in steps" :key="s.t" v-reveal="n * 120">
          <span class="num">{{ n + 1 }}</span>
          <h3>{{ s.t }}</h3>
          <p>{{ s.d }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
