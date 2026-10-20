<template>
  <section id="areas" class="section">
    <div class="container">
      <h2 v-reveal>Areas We Service</h2>
      <p v-reveal="80" class="sub">Based at {{ business.street }}, {{ business.suburb }}, we travel across South-West Sydney.</p>
      <ul class="chips">
        <li v-for="(a, n) in areas" :key="a" v-reveal="n * 40">{{ a }}</li>
      </ul>
    </div>
  </section>
</template>
