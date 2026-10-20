<template>
  <section id="services" class="section">
    <div class="container">
      <h2 v-reveal>Our Electrical Services</h2>
      <p v-reveal="80" class="sub">Everything you need to power your home or business safely and efficiently.</p>
      <div class="grid grid-4">
        <article v-for="(s, n) in services" :key="s.title" v-reveal="n * 100" class="card lift">
          <div class="icon" aria-hidden="true">{{ s.icon }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.text }}</p>
          <a href="#quote" class="link">Get a quote →</a>
        </article>
      </div>
    </div>
  </section>
</template>
