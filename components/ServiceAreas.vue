<template>
  <section id="areas" class="section">
    <div class="container">
      <h2 v-reveal>Servicing All of Sydney</h2>
      <p v-reveal="80" class="sub">Based in {{ business.suburb }}, we install solar and batteries right across Greater Sydney. Don't see your suburb? Get in touch.</p>
      <ul class="chips">
        <li v-for="(a, n) in areas" :key="a" v-reveal="n * 40">{{ a }}</li>
      </ul>
    </div>
  </section>
</template>
